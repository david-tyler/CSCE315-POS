package com.project3.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project3.backend.entity.User;
import com.project3.backend.repository.UserRepository;

import java.util.List;

/**
 * Service implementation for managing user-related operations.
 * Implements the {@link UserService} interface.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Fetches all users from the repository.
     *
     * @return List of users.
     */
    public List<User> fetchUsers() {
        return (List<User>) userRepository.findAll();
    }

    /**
     * Fetches the role of a user by email. If the user does not exist, creates a new user with the specified email and assigns the role "customer".
     *
     * @param email The email of the user.
     * @return The role of the user.
     */
    public String fetchRoleOrCreate(String email) {
        List<User> userList = userRepository.findByEmail(email);
        User user = userList.size() > 0 ? userList.get(0) : null;
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setRole("customer");
            userRepository.save(user);
        }
        return user.getRole();
    }

    /**
     * Fetches the role of a user by email. If the user does not exist, returns the default role "customer".
     *
     * @param email The email of the user.
     * @return The role of the user or the default role if the user does not exist.
     */
    public String fetchRole(String email) {
        List<User> userList = userRepository.findByEmail(email);
        User user = userList.size() > 0 ? userList.get(0) : null;
        if (user == null) {
            return "customer";
        }
        return user.getRole();
    }

    /**
     * Saves a user to the repository.
     *
     * @param user The user to be saved.
     * @return The saved user.
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their ID from the repository.
     *
     * @param id The ID of the user to be deleted.
     */
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
