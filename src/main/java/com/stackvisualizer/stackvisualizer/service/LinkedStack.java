package com.stackvisualizer.stackvisualizer.service;

import org.springframework.stereotype.Service;

@Service
public class LinkedStack {

    private Node top;

    private static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    public void push(int value) {
        Node newNode = new Node(value);
        newNode.next = top;
        top = newNode;
    }

    public int pop() {
        if (top == null)
            throw new RuntimeException("Stack Underflow");

        int value = top.data;
        top = top.next;
        return value;
    }

    public Integer peek() {
        if (top == null)
            return null;

        return top.data;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public int count() {
        int count = 0;
        Node temp = top;

        while (temp != null) {
            count++;
            temp = temp.next;
        }

        return count;
    }
}