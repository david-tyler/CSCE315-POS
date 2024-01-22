package com.project3.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project3.backend.entity.Order;
/**
 * Repository interface for managing {@link Order} entities.
 * Extends {@link CrudRepository} to inherit CRUD (Create, Read, Update, Delete) operations.
 */
@Repository
public interface OrderRepository extends CrudRepository<Order, Integer>{
}
