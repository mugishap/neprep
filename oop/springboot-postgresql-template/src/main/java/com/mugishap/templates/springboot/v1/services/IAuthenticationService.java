package com.mugishap.templates.springboot.v1.services;

import com.mugishap.templates.springboot.v1.dtos.InitiatePasswordDTO;
import com.mugishap.templates.springboot.v1.dtos.ResetPasswordDTO;

public interface IAuthenticationService {

void initiateResetPassword(InitiatePasswordDTO dto);
void resetPassword(ResetPasswordDTO dto);

}
