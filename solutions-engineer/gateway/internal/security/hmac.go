package security

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
)

var ErrInvalidSignature = errors.New("invalid HMAC signature")

func VerifyMoveoSignature(payload []byte, signatureHeader string, secret string) bool {
	if signatureHeader == "" || secret == "" {
		return false
	}

	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(payload)
	expectedMAC := mac.Sum(nil)
	expectedSignature := hex.EncodeToString(expectedMAC)

	return hmac.Equal([]byte(signatureHeader), []byte(expectedSignature))
}
