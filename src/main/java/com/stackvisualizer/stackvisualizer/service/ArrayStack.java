package com.stackvisualizer.stackvisualizer.service;

import org.springframework.stereotype.Service;
import java.util.Arrays;

@Service
public class ArrayStack {

    private int[] stack;
    private int top = -1;
    private int size = 10;   // default size

    public ArrayStack() {
        stack = new int[size];
    }

    public void push(int value) {
        if (top == size - 1)
            throw new RuntimeException("Stack Overflow");

        stack[++top] = value;
    }

    public int pop() {
        if (top == -1)
            throw new RuntimeException("Stack Underflow");

        return stack[top--];
    }

    public Integer peek() {
        if (top == -1)
            return null;

        return stack[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public int count() {
        return top + 1;
    }

    public int[] getStack() {
        return Arrays.copyOf(stack, top + 1);
    }
}