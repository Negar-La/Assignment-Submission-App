package com.demo.AssignmentSubmission.service;

import com.demo.AssignmentSubmission.domain.User;
import com.demo.AssignmentSubmission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userOpt = userRepo.findByUsername(username);
        return userOpt.orElseThrow(()-> new UsernameNotFoundException("Invalid credentials"));

    }
}
