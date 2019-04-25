package com.example.juridov.lamp.repository;

import com.example.juridov.lamp.entity.RoomWithLamp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomWithLampRepository extends JpaRepository<RoomWithLamp, Long> {
    RoomWithLamp findRoomWithLampById(Long id);
}
