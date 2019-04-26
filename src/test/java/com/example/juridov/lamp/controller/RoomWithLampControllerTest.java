package com.example.juridov.lamp.controller;

import com.example.juridov.lamp.entity.RoomWithLamp;
import com.example.juridov.lamp.repository.RoomWithLampRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RoomWithLampControllerTest {

    @Autowired
    private TestRestTemplate template;

    @Autowired
    private RoomWithLampRepository roomWithLampRepository;

    @Test
    public void getRooms() throws JsonProcessingException, JSONException {
        ResponseEntity<String> result = template.getForEntity("/room", String.class);
        List<RoomWithLamp> expected = roomWithLampRepository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        assertEquals(HttpStatus.OK, result.getStatusCode());
        JSONAssert.assertEquals(mapper.writeValueAsString(expected), result.getBody(), false);
    }
}