package com.stackvisualizer.stackvisualizer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Stack;
import java.util.LinkedList;

@RestController
public class StackController {

    private Stack<Integer> arrayStack = new Stack<>();
    private LinkedList<Integer> linkedStack = new LinkedList<>();

    // PUSH
    @GetMapping("/push")
    public String push(@RequestParam int value, @RequestParam String type) {

        if(type.equals("array"))
            arrayStack.push(value);
        else
            linkedStack.push(value);

        return "success";
    }

    // POP
    @GetMapping("/pop")
    public String pop(@RequestParam String type) {

        try{
            if(type.equals("array"))
                return String.valueOf(arrayStack.pop());
            else
                return String.valueOf(linkedStack.pop());
        }
        catch(Exception e){
            return "Stack Empty";
        }
    }
    //peak
@GetMapping("/peek")
public ResponseEntity<?> peek(@RequestParam String type) {

    if(type.equals("array")) {
        if(arrayStack.isEmpty()) {
            return ResponseEntity.badRequest().body("Stack is empty");
        }
        return ResponseEntity.ok(arrayStack.peek());
    }
    else {
        if(linkedStack.isEmpty()) {
            return ResponseEntity.badRequest().body("Stack is empty");
        }
        return ResponseEntity.ok(linkedStack.peek());
    }
}
    // CLEAR
    @GetMapping("/clear")
    public String clear(@RequestParam String type){

        if(type.equals("array"))
            arrayStack.clear();
        else
            linkedStack.clear();

        return "cleared";
    }
}