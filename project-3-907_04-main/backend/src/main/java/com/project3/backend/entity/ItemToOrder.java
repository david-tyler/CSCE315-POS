package com.project3.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * Represents the mapping between an item and an order.
 */
@Entity
@Data
public class ItemToOrder {
    /**
     * The unique identifier for the item-to-order mapping.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "item_to_order_id_seq")
    @SequenceGenerator(name = "item_to_order_id_seq", sequenceName = "item_to_order_id_seq", allocationSize = 1)
    int id;

    /**
     * The identifier of the item in the mapping.
     */
    int itemId;

    /**
     * The identifier of the order in the mapping.
     */
    int orderId;

    /**
     * The quantity of the item in the order.
     */
    int quantity;
}
