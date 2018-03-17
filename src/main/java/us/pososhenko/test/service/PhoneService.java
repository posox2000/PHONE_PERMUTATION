package us.pososhenko.test.service;

import us.pososhenko.test.config.Constants;
import us.pososhenko.test.security.AuthoritiesConstants;
import us.pososhenko.test.security.SecurityUtils;
import us.pososhenko.test.service.util.RandomUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Service class for calculate phone number permutations.
 */
@Service
@Transactional
public class PhoneService {
    
    private final Logger log = LoggerFactory.getLogger(PhoneService.class);
    private final String[] letters = {"0", "1", "2ABC", "3DEF", "4GHI", "5JKL", "6MNO", "7PKRS", "8TUY", "9WXYZ"};
    
    public PhoneService(){}
    
    public List<String> getPhonePermutations(String num, Integer page, Integer pagesize){
        
        List<String> result = new ArrayList<String>();        
        StringBuilder reverseNum = new StringBuilder();
 
        // append a string into StringBuilder input1
        reverseNum.append(num);
 
        // reverse StringBuilder input1
        reverseNum = reverseNum.reverse();
        
        int totalCount = getCount(reverseNum.toString());
        
        page = (page-1<0)? 0:page-1;
         
        int iterations = (((pagesize*page)+pagesize) > totalCount) ? totalCount: ((pagesize*page)+pagesize);
        
        for(int i=pagesize*page; i < iterations; i++ ){
            result.add(decodeNum(reverseNum.toString(), i, 0 ));
        }

        return result;
    }

    private String decodeNum(String number, Integer startElement, Integer ind ){      
       if (ind < number.length()){        
           String separator = (ind == 3 || ind == 6)? " ":"";
           return 
               decodeNum(
                    number, 
                   startElement/letters[Character.getNumericValue(number.charAt(ind))].length(),
                   ++ind 
               ) + "" +
               separator +
               letters[Character.getNumericValue(number.charAt(ind-1))].charAt(
                    startElement % (letters[Character.getNumericValue(number.charAt(ind-1))].length())
                );
               
       } else {
         return ""; 
       }
     }
    
    private int getCount(String number){
        int total = 1;
        for (int i=0; i<number.length(); i++){
            total = total*letters[Character.getNumericValue(number.charAt(i))].length();
        }
        return total;
    }
}