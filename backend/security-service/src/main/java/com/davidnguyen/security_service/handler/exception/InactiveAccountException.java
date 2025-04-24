package com.davidnguyen.security_service.handler.exception;

public class InactiveAccountException extends RuntimeException{
    public InactiveAccountException(String message) {
        super(message);
    }
}
