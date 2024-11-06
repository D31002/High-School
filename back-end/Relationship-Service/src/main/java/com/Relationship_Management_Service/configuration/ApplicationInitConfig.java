package com.Relationship_Management_Service.configuration;

import com.Relationship_Management_Service.models.StudentClassRoom;
import com.Relationship_Management_Service.models.TeacherSubject;
import com.Relationship_Management_Service.repository.StudentClassRoomRepository;
import com.Relationship_Management_Service.repository.StudentParentRepository;
import com.Relationship_Management_Service.repository.TeacherSubjectRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(TeacherSubjectRepository teacherSubjectRepository, StudentClassRoomRepository studentClassRoomRepository) {
        return args -> {
            if(!teacherSubjectRepository.existsById(1)){

                int numberOfSubjects = 10;
                int teachersPerSubject = 3;

                for(int subjectId = 1;subjectId<=numberOfSubjects;subjectId++){
                    for (int teacherId = (subjectId -1) * teachersPerSubject + 2;
                         teacherId < subjectId*teachersPerSubject + 2;teacherId++){
                        teacherSubjectRepository.save(TeacherSubject.builder()
                                .teacherId(teacherId)
                                .subjectId(subjectId)
                                .build());
                    }
                }

                for (int i =1;i<=40;i++){
                    studentClassRoomRepository.save(StudentClassRoom.builder()
                            .studentId(i)
                            .classRoomId(1)
                            .build());
                }
            }
        };
    }
}