package com.example.juridov.lamp.controller;

import com.example.juridov.lamp.entity.RoomWithLamp;
import com.example.juridov.lamp.service.RoomWithLampService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoomWithLampController {
    private final RoomWithLampService roomWithLampService;

    public RoomWithLampController(RoomWithLampService roomWithLampService) {
        this.roomWithLampService = roomWithLampService;
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    @GetMapping(value = "/{id}")
    public RoomWithLamp getRoomWithLamp(@PathVariable Long id) {
        return roomWithLampService.getRoomWithLamp(id);
    }
    @GetMapping(path = "/")
    public List<RoomWithLamp> getRoomWithLamp() {
        return roomWithLampService.getAll();
    }
}
