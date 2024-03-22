package com.mugishap.templates.springboot.v1.serviceImpls;

import com.mugishap.templates.springboot.v1.dtos.InitiatePasswordDTO;
import com.mugishap.templates.springboot.v1.dtos.ResetPasswordDTO;
import com.mugishap.templates.springboot.v1.enums.EUserStatus;
import com.mugishap.templates.springboot.v1.exceptions.AppException;
import com.mugishap.templates.springboot.v1.models.User;
import com.mugishap.templates.springboot.v1.repositories.IUserRepository;
import com.mugishap.templates.springboot.v1.services.IAuthenticationService;
import com.mugishap.templates.springboot.v1.services.MailService;
import com.mugishap.templates.springboot.v1.utils.Utility;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final IUserRepository userRepository;
    private final MailService mailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public void initiateResetPassword(InitiatePasswordDTO dto) {
        User user = this.userRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setActivationCode(Utility.randomUUID(6, 0, 'N'));
        user.setStatus(EUserStatus.RESET);

        this.userRepository.save(user);

        mailService.sendResetPasswordMail(user.getEmail(), user.getFirstName() + " " + user.getLastName(), user.getActivationCode());

    }

    @Override
    public void resetPassword(ResetPasswordDTO dto) {
        User user = this.userRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        if (Utility.isCodeValid(user.getActivationCode(), dto.getActivationCode()) &&
                (user.getStatus().equals(EUserStatus.RESET)) || user.getStatus().equals(EUserStatus.PENDING)) {
            user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
            user.setActivationCode(Utility.randomUUID(6, 0, 'N'));
            user.setStatus(EUserStatus.ACTIVE);
            this.userRepository.save(user);
        } else {
            throw new AppException("Invalid code or account status");
        }
    }
}
