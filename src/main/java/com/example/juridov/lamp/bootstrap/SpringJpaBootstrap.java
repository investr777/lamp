package com.example.juridov.lamp.bootstrap;

import com.example.juridov.lamp.entity.RoomWithLamp;
import com.example.juridov.lamp.repository.RoomWithLampRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class SpringJpaBootstrap implements ApplicationListener<ContextRefreshedEvent> {
    private final RoomWithLampRepository roomWithLampRepository;

    public SpringJpaBootstrap(RoomWithLampRepository roomWithLampRepository) {
        this.roomWithLampRepository = roomWithLampRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        createData();
    }

    private void createData() {
        //First room
        RoomWithLamp firstRoom = new RoomWithLamp();
        firstRoom.setActiveLamp(true);
        roomWithLampRepository.save(firstRoom);

        //Second room
        RoomWithLamp secondRoom = new RoomWithLamp();
        secondRoom.setActiveLamp(false);
        roomWithLampRepository.save(secondRoom);

        //Third room
        RoomWithLamp thirdRoom = new RoomWithLamp();
        thirdRoom.setActiveLamp(false);
        roomWithLampRepository.save(thirdRoom);

        //Fourth room
        RoomWithLamp fourthRoom = new RoomWithLamp();
        fourthRoom.setActiveLamp(true);
        roomWithLampRepository.save(fourthRoom);

        //Fifth room
        RoomWithLamp fifthRoom = new RoomWithLamp();
        fifthRoom.setActiveLamp(true);
        roomWithLampRepository.save(fifthRoom);
    }
}
