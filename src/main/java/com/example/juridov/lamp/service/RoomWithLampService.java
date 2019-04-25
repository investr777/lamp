package com.example.juridov.lamp.service;

import com.example.juridov.lamp.entity.RoomWithLamp;
import com.example.juridov.lamp.repository.RoomWithLampRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomWithLampService {
    private final RoomWithLampRepository roomWithLampRepository;

    public RoomWithLampService(RoomWithLampRepository roomWithLampRepository) {
        this.roomWithLampRepository = roomWithLampRepository;
    }

    public RoomWithLamp getRoomWithLamp(Long id) {
        RoomWithLamp roomWithLampFromDB = roomWithLampRepository.findRoomWithLampById(id);
        return roomWithLampFromDB;
    }

    public List<RoomWithLamp> getAll(){
        return roomWithLampRepository.findAll();
    }
}
