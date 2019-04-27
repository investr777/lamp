package com.example.juridov.lamp.controller;

import com.example.juridov.lamp.entity.RoomWithLamp;
import com.example.juridov.lamp.service.RoomWithLampService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomWithLampController {
    private final RoomWithLampService roomWithLampService;

    public RoomWithLampController(RoomWithLampService roomWithLampService) {
        this.roomWithLampService = roomWithLampService;
    }

    @GetMapping(value = "/{id}")
    public RoomWithLamp getRoomWithLamp(@PathVariable Long id){
        return roomWithLampService.getRoomWithLamp(id);
    }

    @GetMapping
    public List<RoomWithLamp> getRooms() {
        return roomWithLampService.getAll();
    }

    @MessageMapping("/changeLight")
    @SendTo("/topic/activity")
    public RoomWithLamp change(RoomWithLamp roomWithLamp){
        return roomWithLampService.change(roomWithLamp.getId());
    }
}
