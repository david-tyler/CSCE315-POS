package com.project3.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

/**
 * Represents a user in the system.
 */
@Entity
@Data
public class User {
    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_id_seq")
    @SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1)
    private int id;

    /**
     * The username associated with the user.
     */
    private String username;

    /**
     * The password associated with the user.
     */
    private String password;

    /**
     * The email address associated with the user.
     */
    private String email;

    /**
     * The role or type of the user within the system.
     */
    private String role;

    /**
     * Default constructor for the User class.
     * Initializes all fields to empty values.
     */
    public User() {
        this.id = 0;
        this.username = "";
        this.password = "";
        this.email = "";
        this.role = "";
    }
}
