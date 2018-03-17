package us.pososhenko.test.web.rest;

import com.codahale.metrics.annotation.Timed;

import us.pososhenko.test.service.PhoneService;
import us.pososhenko.test.service.dto.UserDTO;
import us.pososhenko.test.web.rest.errors.*;
import us.pososhenko.test.web.rest.vm.KeyAndPasswordVM;
import us.pososhenko.test.web.rest.vm.ManagedUserVM;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

/**
 * REST controller for generate alphanumeric phone numbers.
 */
@RestController
@RequestMapping("/api")
public class PhoneResource {

    private final Logger log = LoggerFactory.getLogger(PhoneResource.class);

    private final PhoneService phoneService;

    public PhoneResource( PhoneService phoneService) {

        this.phoneService = phoneService;
    }
    
    /**
     * GET  /phonePage : return one page of phone alpha/numeric numbers variations.
     *
     * @param num the input string 7 or 10 digit
     * @param page the requested page number
     * @param pagesize the page size (default 10)
     */
    @GetMapping("/phonePage")
    @Timed
    public List<String> activateAccount(@RequestParam(value = "num") String num, 
                                @RequestParam(value = "page") Integer page,
                                @RequestParam(value = "pagesize") Integer pagesize) {
        return this.phoneService.getPhonePermutations(num, page, pagesize);
    }
}