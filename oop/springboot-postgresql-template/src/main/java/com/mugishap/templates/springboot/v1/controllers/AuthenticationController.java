package com.mugishap.templates.springboot.v1.controllers;

import com.mugishap.templates.springboot.v1.dtos.InitiatePasswordDTO;
import com.mugishap.templates.springboot.v1.dtos.ResetPasswordDTO;
import com.mugishap.templates.springboot.v1.dtos.SignInDTO;
import com.mugishap.templates.springboot.v1.enums.EUserStatus;
import com.mugishap.templates.springboot.v1.exceptions.AppException;
import com.mugishap.templates.springboot.v1.models.User;
import com.mugishap.templates.springboot.v1.payload.ApiResponse;
import com.mugishap.templates.springboot.v1.payload.JwtAuthenticationResponse;
import com.mugishap.templates.springboot.v1.security.JwtTokenProvider;
import com.mugishap.templates.springboot.v1.services.IAuthenticationService;
import com.mugishap.templates.springboot.v1.services.IUserService;
import com.mugishap.templates.springboot.v1.services.MailService;
import com.mugishap.templates.springboot.v1.utils.Utility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/auth")
public class AuthenticationController {

    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final IAuthenticationService authenticationService;

    @PostMapping(path = "/signin")
    public ResponseEntity<ApiResponse> signin(@Valid @RequestBody SignInDTO dto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = null;

        try {
            jwt = jwtTokenProvider.generateToken(authentication);
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = this.userService.getByEmail(dto.getEmail());
        return ResponseEntity.ok(ApiResponse.success("Login successful", new JwtAuthenticationResponse(jwt, user)));
    }

    @PostMapping(path = "/initiate-reset-password")
    public ResponseEntity<ApiResponse> initiateResetPassword(@RequestBody @Valid InitiatePasswordDTO dto) {
        this.authenticationService.initiateResetPassword(dto);
        return ResponseEntity.ok(ApiResponse.success("Please check your mail and activate account"));
    }


    @PostMapping(path = "/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody @Valid ResetPasswordDTO dto) {
     this.authenticationService.resetPassword(dto);
        return ResponseEntity.ok(new ApiResponse(true, "Password successfully reset"));
    }
}