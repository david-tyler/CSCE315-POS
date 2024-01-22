package com.project3.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.User;

import java.util.List;

/**
 * Repository interface for performing CRUD operations on {@link User} entities.
 * Extends {@link CrudRepository} to inherit basic CRUD functionality.
 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    /**
     * Finds a list of users by their email address.
     *
     * @param email The email address to search for.
     * @return A list of {@link User} entities matching the specified email.
     */
    List<User> findByEmail(String email);
}
