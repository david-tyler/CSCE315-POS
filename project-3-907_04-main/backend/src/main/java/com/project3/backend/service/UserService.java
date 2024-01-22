package com.project3.backend.service;

import java.util.List;

import com.project3.backend.entity.User;
/**
 * The {@code UserService} interface defines methods for interacting with user-related operations.
 * It provides functionality to retrieve, manipulate, and manage user information in the backend.
 */
public interface UserService {

    /**
     * Retrieves a list of all users in the system.
     *
     * @return A {@code List} containing {@code User} objects representing the users.
     */
    List<User> fetchUsers();

    /**
     * Retrieves the role associated with the specified email.
     * If the role does not exist, creates and returns a new one.
     *
     * @param email The email of the user for which to fetch or create a role.
     * @return A {@code String} representing the role associated with the provided email.
     */
    String fetchRoleOrCreate(String email);

    /**
     * Retrieves the role associated with the specified email.
     *
     * @param email The email of the user for which to fetch the role.
     * @return A {@code String} representing the role associated with the provided email.
     */
    String fetchRole(String email);

    /**
     * Saves the provided {@code User} object in the system.
     *
     * @param user The {@code User} object to be saved.
     * @return The saved {@code User} object.
     */
    User saveUser(User user);

    /**
     * Deletes the user with the specified ID from the system.
     *
     * @param id The ID of the user to be deleted.
     */
    void deleteUser(int id);
}
