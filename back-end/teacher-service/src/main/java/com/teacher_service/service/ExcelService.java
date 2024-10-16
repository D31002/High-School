package com.teacher_service.service;

import com.teacher_service.Exception.AppException;
import com.teacher_service.Exception.ErrorCode;
import com.teacher_service.dto.request.TeacherCreationRequest;
import com.teacher_service.dto.response.TeacherResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExcelService {

    @NonFinal
    String[] headers = {
        "STT", "MaSo", "HoTen","GioiTinh","NgaySinh","DiaChi","SDT","Email","DanToc","QuocTich"
    };
    @NonFinal
    String Sheet_Name = "teacher-data";

    public ByteArrayInputStream DownDataExcel(List<TeacherResponse> responses){
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
            for(TeacherResponse s : responses){
                Row dataRow = sheet.createRow(rowIndex);
                dataRow.createCell(0).setCellValue(rowIndex);
                dataRow.createCell(1).setCellValue(s.getTeacherCode());
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

    public List<TeacherCreationRequest> getTeachersDataFromExcel(InputStream inputStream){
        List<TeacherCreationRequest> requests = new ArrayList<>();

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
                boolean hasData = false;
                Iterator<Cell> cellIterator = row.cellIterator();
                int cellIndex = 0;
                TeacherCreationRequest request = new TeacherCreationRequest();
                while (cellIterator.hasNext()){
                    Cell cell = cellIterator.next();
                    if (cell == null) {
                        continue;
                    }
                    if (cell.getCellType() != CellType.BLANK) {
                        hasData = true;
                    }
                    switch (cellIndex){
                        case 0 -> {
                            cellIndex++;
                            continue;
                        }
                        case 1 -> {
                            String teacherCode = cell.getStringCellValue();
                            request.setTeacherCode(teacherCode);
                            request.setUsername(teacherCode);
                        }
                        case 2 -> {
                            request.setFullName(cell.getStringCellValue());
                        }
                        case 3 -> request.setGender(Objects.equals(cell.getStringCellValue(), "Nam") ? 0 : 1);
                        case 4 -> {
                            if(cell.getCellType() == CellType.NUMERIC){
                                double numericValue = cell.getNumericCellValue();
                                Date date = DateUtil.getJavaDate(numericValue);
                                LocalDate birthday = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                request.setBirthday(birthday);
                            }else {
                                LocalDateTime localDateTime = cell.getLocalDateTimeCellValue();
                                if (localDateTime != null) {
                                    LocalDate birthday = localDateTime.toLocalDate();
                                    request.setBirthday(birthday);
                                }
                            }

                        }
                        case 5 -> {
                            String[] addressParts = cell.getStringCellValue().split("-");
                            if(addressParts.length == 5){
                                request.setHouseNumber(Integer.parseInt(addressParts[0].trim()));
                                request.setStreet(addressParts[1].trim());
                                request.setWard(addressParts[2].trim());
                                request.setDistrict(addressParts[3].trim());
                                request.setCity(addressParts[4].trim());
                            }
                        }
                        case 6 -> request.setPhoneNumber(String.valueOf(cell.getNumericCellValue()));
                        case 7 -> request.setEmail(cell.getStringCellValue());
                        case 8 -> request.setEthnicity(cell.getStringCellValue());
                        case 9 -> request.setNationality(cell.getStringCellValue());
                        case 10 -> request.setPassword(cell.getStringCellValue());
                        default -> {

                        }
                    }
                    cellIndex++;
                }
                if (hasData) {
                    requests.add(request);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return requests;
    }


}
