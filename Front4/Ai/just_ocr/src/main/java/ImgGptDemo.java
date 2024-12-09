import com.google.gson.Gson;
import com.google.gson.JsonObject;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ImgGptDemo {

    private static final String API_KEY = "dd"; // OpenAI API 키 설정
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    public String analyzeImage(String imagePath) {
        try {
            // 1. 이미지 파일을 텍스트로 변환 (OCR 사용)
            String extractedText = extractTextFromImage(imagePath);

            // 2. 추출된 텍스트를 ChatGPT API로 전송하여 식재료 분석 요청
            String ingredients = analyzeIngredientsWithChatGpt(extractedText);

            // 3. 분석 결과 반환
            return ingredients;

        } catch (IOException | TesseractException e) {
            e.printStackTrace();
            return "식재료 분석 불가능";
        }
    }

    private static String extractTextFromImage(String imagePath) throws TesseractException {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("tessdata"); // Tesseract 데이터 파일 경로 설정
        tesseract.setLanguage("kor"); // 한국어로 설정 (영어는 "eng"로 설정 가능)

        File imageFile = new File(imagePath);
        return tesseract.doOCR(imageFile); // 이미지에서 텍스트 추출
    }

    private static String analyzeIngredientsWithChatGpt(String text) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(API_URL);

        // 요청 헤더 설정
        httpPost.setHeader("Content-Type", "application/json; charset=UTF-8");
        httpPost.setHeader("Authorization", "Bearer " + API_KEY);

        // 요청 메시지 생성
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are an assistant that identifies ingredients from text. 결과를 한글로 작성해줘.");

        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", "Analyze the following text and list ingredients:\n\n" + text);

        Map<String, Object> json = new HashMap<>();
        json.put("model", "gpt-4");
        json.put("messages", new Object[]{systemMessage, userMessage});

        StringEntity entity = new StringEntity(new Gson().toJson(json), "UTF-8");
        httpPost.setEntity(entity);

        // 요청 전송 및 응답 수신
        HttpResponse response = httpClient.execute(httpPost);
        HttpEntity responseEntity = response.getEntity();
        String result = EntityUtils.toString(responseEntity, "UTF-8");

        // 연결 종료
        httpClient.close();

        // JSON 응답 파싱하여 식재료 내용 추출
        JsonObject jsonObject = new Gson().fromJson(result, JsonObject.class);
        return jsonObject.getAsJsonArray("choices")
                .get(0).getAsJsonObject()
                .getAsJsonObject("message")
                .get("content").getAsString();
    }
}
