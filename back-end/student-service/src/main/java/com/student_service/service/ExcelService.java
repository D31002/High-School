package com.student_service.service;

import com.student_service.Exception.AppException;
import com.student_service.Exception.ErrorCode;
import com.student_service.dto.request.StudentCreationRequest;
import com.student_service.dto.response.StudentResponse;

import com.student_service.models.Student;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExcelService {

    @NonFinal
    String[] headers = {
        "STT", "MaSo", "HoTen","GioiTinh","NgaySinh","DiaChi","SDT","Email","DanToc","QuocTich"
    };
    @NonFinal
    String Sheet_Name = "student-data";

    public ByteArrayInputStream DownDataExcel(List<StudentResponse> responses){
        try {
            Workbook workbook = new XSSFWorkbook();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            Sheet sheet = workbook.createSheet(Sheet_Name);

            Row row = sheet.createRow(0);

            for(int i = 0;i< headers.length;i++){
                Cell cell = row.createCell(i);
                cell.setCellValue(headers[i]);
            }

            int rowIndex =1;
            for(StudentResponse s : responses){
                Row dataRow = sheet.createRow(rowIndex);
                dataRow.createCell(0).setCellValue(rowIndex);
                dataRow.createCell(1).setCellValue(s.getStudentCode());
                dataRow.createCell(2).setCellValue(s.getUserProfileResponse().getFullName());
                dataRow.createCell(3).setCellValue(s.getUserProfileResponse().getGender() == 1 ? "Nữ" : "Nam");
                dataRow.createCell(4).setCellValue(s.getUserProfileResponse().getBirthday().toString());
                String daichi = String.join("-",
                        String.valueOf(s.getUserProfileResponse().getAddress().getHouseNumber()),
                        s.getUserProfileResponse().getAddress().getStreet(),
                        s.getUserProfileResponse().getAddress().getWard(),
                        s.getUserProfileResponse().getAddress().getDistrict(),
                        s.getUserProfileResponse().getAddress().getCity());
                dataRow.createCell(5).setCellValue(daichi);
                dataRow.createCell(6).setCellValue(s.getUserProfileResponse().getPhoneNumber());
                dataRow.createCell(7).setCellValue(s.getUserProfileResponse().getEmail());
                dataRow.createCell(8).setCellValue(s.getUserProfileResponse().getEthnicity());
                dataRow.createCell(9).setCellValue(s.getUserProfileResponse().getNationality());
                rowIndex++;
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());

        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

    public boolean isValidExcelFile(MultipartFile file){
        return Objects.equals(file.getContentType(),"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public List<StudentCreationRequest> getStudentsDataFromExcel(InputStream inputStream){
        List<StudentCreationRequest> requests = new ArrayList<>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheet("Sheet1");
            if (sheet == null) {
                throw new AppException(ErrorCode.SHEET_NOT_EXISTED);
            }

            for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++){
                Row row = sheet.getRow(rowIndex);
                if (row == null) {
                    continue;
                }
                Iterator<Cell> cellIterator = row.cellIterator();
                int cellIndex = 0;
                StudentCreationRequest request = new StudentCreationRequest();
                while (cellIterator.hasNext()){
                    Cell cell = cellIterator.next();
                    cellIndex++;
                    if (cellIndex == 1) {
                        continue;
                    }
                    switch (cellIndex){
                        case 2 -> {
                            String studentCode = cell.getStringCellValue();
                            request.setStudentCode(studentCode);
                            request.setUsername(studentCode);
                        }
                        case 3 -> {
                            request.setFullName(cell.getStringCellValue());
                        }
                        case 4 -> request.setGender(Objects.equals(cell.getStringCellValue(), "Nam") ? 0 : 1);
                        case 5 -> {

                            LocalDate birthday = cell.getLocalDateTimeCellValue().toLocalDate();
                            request.setBirthday(birthday);
                        }
                        case 6 -> {
                            String[] addressParts = cell.getStringCellValue().split("-");
                            if(addressParts.length == 5){
                                request.setHouseNumber(Integer.parseInt(addressParts[0].trim()));
                                request.setStreet(addressParts[1].trim());
                                request.setWard(addressParts[2].trim());
                                request.setDistrict(addressParts[3].trim());
                                request.setCity(addressParts[4].trim());
                            }
                        }
                        case 7 -> request.setPhoneNumber(String.valueOf(cell.getNumericCellValue()));
                        case 8 -> request.setEmail(cell.getStringCellValue());
                        case 9 -> request.setEthnicity(cell.getStringCellValue());
                        case 10 -> request.setNationality(cell.getStringCellValue());
                        case 11 -> request.setPassword(cell.getStringCellValue());
                        default -> {

                        }
                    }
                }
                requests.add(request);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return requests;
    }


}
