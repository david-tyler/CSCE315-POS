package com.project3.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

/**
 * The `Order` class represents a customer order in an e-commerce system.
 * It includes information about the order's ID, total price, timestamp, and
 * user ID, as well as a list of ordered item IDs.
 */
@Entity
@Data
public class Order {

    /**
     * The unique identifier for the order.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "order_id_seq")
    @SequenceGenerator(name = "order_id_seq", sequenceName = "order_id_seq", allocationSize = 1)
    private int id;

    /**
     * The total price of the order.
     */
    private double price;

    /**
     * The timestamp when the order was placed.
     */
    private LocalDateTime time;

    /**
     * The user ID associated with the order.
     */
    private int userId;

    /**
     * The status of the order.
     */
    private String status;

    /**
     * A mapping of item IDs to their respective quantities in the order.
     */
    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Map<Integer, Integer> items; // item id -> quantity

    /**
     * Set of ItemToOrder entities representing the association between items and orders.
     */
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderId")
    @Transient
    @JsonIgnore
    private Set<ItemToOrder> itemToOrders;

    /**
     * Default constructor for creating an empty order.
     */
    public Order() {
        this.id = 0;
        this.price = 0.0;
        this.time = LocalDateTime.now();
        this.userId = 0;
        this.items = new HashMap<>();
    }

    /**
     * Constructor for creating an order with specified details.
     *
     * @param id     The unique identifier for the order.
     * @param price  The total price of the order.
     * @param time   The timestamp when the order was placed.
     * @param userId The user ID associated with the order.
     */
    public Order(int id, float price, LocalDateTime time, int userId) {
        this.id = id;
        this.price = price;
        this.time = time;
        this.userId = userId;
        this.items = new HashMap<>();
    }
}
