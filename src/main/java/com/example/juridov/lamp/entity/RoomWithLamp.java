package com.example.juridov.lamp.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import javax.persistence.*;

@Entity
@JsonAutoDetect
@Table(name = "room")
public class RoomWithLamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "lamp")
    private Boolean activeLamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActiveLamp() {
        return activeLamp;
    }

    public void setActiveLamp(Boolean activeLamp) {
        this.activeLamp = activeLamp;
    }
}
