package com.samsungsds.eshop.execution;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping(value = "/api/execution")
public class ExecutionController {
    private final Logger logger = LoggerFactory.getLogger(ExecutionController.class);

    private final RabbitTemplate rabbitTemplate;

    public ExecutionController(final RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @GetMapping(value = "/count/{num}")
    public @ResponseBody ResponseEntity execution(@PathVariable("num") Integer num) {
        Message message = new Message();

        for(int i = 0; i < num; i++)
        {

            rabbitTemplate.

            message.setId(i);
            rabbitTemplate.convertAndSend("logs","", message);
        }

        return  ResponseEntity.ok("OK");
    }
}
