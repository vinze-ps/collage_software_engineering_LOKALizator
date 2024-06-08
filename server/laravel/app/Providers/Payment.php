<?php

namespace App\Models;


class Payment
{
    public const IS_SANDBOX_MODE = false;

    public const PAYMENT_STATUS_REGISTERED = 0;
    public const PAYMENT_STATUS_SUCCESS = 1;
    public const PAYMENT_STATUS_FAIL = 2;

    private const CURRENCY = 'PLN';
    private const COUNTRY = 'PL';
    private const LANGUAGE = 'pl';
    private const URL_RETURN = '';
    private const URL_STATUS = '';

    private const API_URL_SANDBOX = 'https://sandbox.przelewy24.pl/';
    private const API_URL_SECURE = 'https://secure.przelewy24.pl/';

    private const REGISTER_TRANSACTION_ENDPOINT = 'api/v1/transaction/register';
    private const VERIFY_TRANSACTION_ENDPOINT = 'api/v1/transaction/verify';

    private const MERCHANT_ID = 1;
    private const CRC_SECURE = '';
    private const CRC_SANDBOX = '';

    private const API_KEY_SECURE = '';
    private const API_KEY_SANDBOX = '';

    private int $Id;
    private int $ProFormaId;
//		private string $Token;
//		private int $Status;


    private string $ClientEmailAddress;
    public Invoice $Invoice;

    public function __construct(int $ProFormaId, string $ClientEmailAddress, Invoice $Invoice = null)
    {
        $this->ProFormaId = $ProFormaId;

        $this->ClientEmailAddress = $ClientEmailAddress;

        if ($Invoice === null) {
            $Invoice = Invoice::fromDatabaseById($this->ProFormaId);
        }
        $this->Invoice = $Invoice;
    }

    public function getSessionId(): string
    {
        return (string)$this->Id;
    }

    public static function getFromDbById(int $id): self
    {
        $pdo = DBConnection::getPDO();
        $s = $pdo->prepare(
            <<<POSTGRES
					SELECT p.pro_forma_id, a.email
					FROM payments p, accounts a, invoices i
					WHERE p.pro_forma_id = i.id
						AND i.client_id = a.id
						AND p.id = :id
					POSTGRES
        );
        $s->bindValue(':id', $id, PDO::PARAM_INT);
        $s->execute();
        $row = $s->fetch(PDO::FETCH_ASSOC);

        $self = new self($row['pro_forma_id'], $row['email']);
        $self->Id = $id;
        return $self;
    }

    public static function verifyNotificationParams(array $PostParams): bool
    {
        if (intval($PostParams['merchantId']) !== self::MERCHANT_ID) {
            GlobalErrorHandler::log_exception(new Exception('verifyNotificationParams() rejected: merchantId'), false);
            return false;
        }
        if (intval($PostParams['posId']) !== self::MERCHANT_ID) {
            GlobalErrorHandler::log_exception(new Exception('verifyNotificationParams() rejected: posId'), false);
            return false;
        }
        if (intval($PostParams['amount']) !== intval($PostParams['originAmount'])) {
            GlobalErrorHandler::log_exception(
                new Exception('verifyNotificationParams() rejected: amount != originAmount'),
                false
            );
            return false;
        }
        if ($PostParams['currency'] !== self::CURRENCY) {
            GlobalErrorHandler::log_exception(new Exception('verifyNotificationParams() rejected: currency'), false);
            return false;
        }
        if ($PostParams['sign'] !== self::getSignForNotification($PostParams)) {
            GlobalErrorHandler::log_exception(new Exception('verifyNotificationParams() rejected: sign'), false);
            return false;
        }


        $pdo = DBConnection::getPDO();
        $s = $pdo->prepare(
            <<<POSTGRES
							SELECT amount
							FROM payments
							WHERE id = :id
				POSTGRES
        );
        $s->bindValue(':id', $PostParams['sessionId'], PDO::PARAM_STR);
        $s->execute();
        $row = $s->fetch(PDO::FETCH_ASSOC);
        if (!$row || !isset($row['amount'])) {
            GlobalErrorHandler::log_exception(new Exception('verifyNotificationParams() rejected: !$row'), false);
            return false;
        }

        if (intval($PostParams['amount']) !== intval($row['amount'])) {
            GlobalErrorHandler::log_exception(
                new Exception('verifyNotificationParams() rejected: Notification[amount] != DataBase[amount]'),
                false
            );
            return false;
        }

        return true;
    }

    public static function verifyNotificationByApi(array $PostParams): bool
    {
        $URL = self::IS_SANDBOX_MODE ? self::API_URL_SANDBOX : self::API_URL_SECURE;
        $URL .= self::VERIFY_TRANSACTION_ENDPOINT;

        $PostParams = self::getVerifyPostFields($PostParams);
        $AuthPassword = self::IS_SANDBOX_MODE ? self::API_KEY_SANDBOX : self::API_KEY_SECURE;

        $URL = $URL . '?' . http_build_query($PostParams);
        $ch = curl_init($URL);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
        curl_setopt($ch, CURLOPT_USERPWD, self::MERCHANT_ID . ":" . $AuthPassword);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
//				curl_setopt($ch, CURLOPT_POSTFIELDS, $PostParams);

        $result = curl_exec($ch);
        curl_close($ch);

        $decodedResult = json_decode($result);
        if (isset($decodedResult->data) && isset($decodedResult->data->status) && $decodedResult->data->status === 'success') {
            return true;
        }
        GlobalErrorHandler::log_exception(
            new Exception('Wrong result from api/verify: ' . $result . ' ; params: ' . json_encode($PostParams)),
            false
        );
        return false;
    }

    private static function getSignForNotification(array $postFields): string
    {
        return hash(
            'sha384',
            json_encode(
                [
                    "merchantId" => $postFields['merchantId'],
                    "posId" => $postFields['posId'],
                    "sessionId" => $postFields['sessionId'],
                    "amount" => $postFields['amount'],
                    "originAmount" => $postFields['originAmount'],
                    "currency" => $postFields['currency'],
                    "orderId" => $postFields['orderId'],
                    "methodId" => $postFields['methodId'],
                    "statement" => $postFields['statement'],
                    "crc" => self::IS_SANDBOX_MODE ? self::CRC_SANDBOX : self::CRC_SECURE
                ],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            )
        );
    }

    private static function getSignForVerification(array $postFields): string
    {
        return hash(
            'sha384',
            json_encode(
                [
                    "sessionId" => $postFields['sessionId'],
                    "orderId" => $postFields['orderId'],
                    "amount" => $postFields['amount'],
                    "currency" => $postFields['currency'],
                    "crc" => self::IS_SANDBOX_MODE ? self::CRC_SANDBOX : self::CRC_SECURE
                ],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            )
        );
    }

    public function getSignForRegister(array $postFields): string
    {
        return hash(
            'sha384',
            json_encode(
                [
                    "sessionId" => $postFields['sessionId'],
                    "merchantId" => $postFields['merchantId'],
                    "amount" => $postFields['amount'],
                    "currency" => $postFields['currency'],
                    "crc" => self::IS_SANDBOX_MODE ? self::CRC_SANDBOX : self::CRC_SECURE
                ],
                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            )
        );
    }

    public function insertToDB(): void
    {
        $pdo = DBConnection::getPDO();
        $s = $pdo->prepare(
            'INSERT INTO payments(pro_forma_id, status, amount) VALUES (:pro_forma_id, :status, :amount) '
        );
        $s->bindValue(':pro_forma_id', $this->ProFormaId, PDO::PARAM_INT);
        $s->bindValue(':status', self::PAYMENT_STATUS_REGISTERED, PDO::PARAM_INT);
        $s->bindValue(':amount', $this->getMoneyAmountInCents(), PDO::PARAM_INT);
        $s->execute();
        $this->Id = $pdo->lastInsertId();
    }

    public function setTokenToDb(string $token): void
    {
        $pdo = DBConnection::getPDO();
        $s = $pdo->prepare(
            'UPDATE payments SET token = :token WHERE id = :id '
        );
        $s->bindValue(':token', $token, PDO::PARAM_STR);
        $s->bindValue(':id', $this->Id, PDO::PARAM_INT);
        $s->execute();
    }

    public function register()
    {
        $POST_FIELDS = $this->getRegisterPostFields();
        $AuthPassword = self::IS_SANDBOX_MODE ? self::API_KEY_SANDBOX : self::API_KEY_SECURE;
        $c = curl_init();
        curl_setopt($c, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
//				curl_setopt($c, CURLOPT_HEADER, 1);
        curl_setopt($c, CURLOPT_USERPWD, self::MERCHANT_ID . ":" . $AuthPassword);
        curl_setopt($c, CURLOPT_TIMEOUT, 30);
        curl_setopt($c, CURLOPT_POST, 1);
        curl_setopt($c, CURLOPT_POSTFIELDS, $POST_FIELDS);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);

        $URL = self::IS_SANDBOX_MODE ? self::API_URL_SANDBOX : self::API_URL_SECURE;
        $URL .= self::REGISTER_TRANSACTION_ENDPOINT;
        curl_setopt($c, CURLOPT_URL, $URL);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 2);
//				curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)");
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($c);
        curl_close($c);

        $decodedResult = json_decode($result);
        if (isset($decodedResult->data) && isset($decodedResult->data->token)) {
            return $decodedResult->data->token;
        }
        throw new Exception('Wrong result from api/register: ' . $result);
    }

    public function setStatus(int $status): void
    {
        $pdo = DBConnection::getPDO();
        $s = $pdo->prepare('UPDATE payments SET status = :status WHERE id = :id');
        $s->bindValue(':status', $status, PDO::PARAM_INT);
        $s->bindValue(':id', $this->Id, PDO::PARAM_INT);
        $s->execute();
    }

    private function getRegisterPostFields(): array
    {
        $post = [
            'merchantId' => self::MERCHANT_ID,
            'posId' => self::MERCHANT_ID,
            'sessionId' => $this->getSessionId(),
            'amount' => $this->getMoneyAmountInCents(),
            'currency' => self::CURRENCY,
            'description' => 'Faktura Pro Forma ' . $this->Invoice->getFullNumber(),
            'transferLabel' => 'FPF ' . $this->Invoice->getFullNumber(),
            'email' => $this->ClientEmailAddress,
            'country' => self::COUNTRY,
            'language' => self::LANGUAGE,
            'urlReturn' => self::URL_RETURN,
            'urlStatus' => self::URL_STATUS,
        ];
        $post['sign'] = $this->getSignForRegister($post);
        return $post;
    }

    private static function getVerifyPostFields(array $PostParams): array
    {
        $post = [
            'merchantId' => $PostParams['merchantId'],
            'posId' => $PostParams['posId'],
            'sessionId' => $PostParams['sessionId'],
            'amount' => $PostParams['amount'],
            'currency' => $PostParams['currency'],
            'orderId' => $PostParams['orderId'],
        ];
        $post['sign'] = self::getSignForVerification($post);
        return $post;
    }

    private function getMoneyAmountInCents(): int
    {
        return intval(round($this->Invoice->getTotalPriceWithTax() * 100));
    }


}
