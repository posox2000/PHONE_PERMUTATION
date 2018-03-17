package us.pososhenko.test.service;

import us.pososhenko.test.PhonePermutationApp;
import us.pososhenko.test.config.Constants;
import us.pososhenko.test.service.util.RandomUtil;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for the PhoneResource REST controller.
 *
 * @see PhoneService
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PhonePermutationApp.class)
@Transactional
public class PhoneServiceTest {
    
    @Autowired
    private PhoneService phoneService;
    
    
    //List<String> getPhonePermutations(String num, Integer page, Integer pagesize)
        @Test
    public void testGetPhonePermutatuinsOne() throws Exception {
        List<String> result = phoneService.getPhonePermutations("1111111", 1, 1);
        assertThat(result.size()).isEqualTo(1);
    }
}