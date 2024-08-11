"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import axios from "axios";

const ChatPage = () => {
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = React.useState([]);
  const lawTerms = [
    "형사법",
    "공법",
    "국제법",
    "국제거래법",
    "노동법",
    "조세법",
    "지적재산권법",
    "민사법",
    "경제법",
    "환경법",
  ];

  const onSubmit = async ({ message }: any) => {
    // 유저 메시지를 상태에 추가
    setMessages((prevMessages): any => [
      ...prevMessages,
      { sender: "user", text: message },
    ]);

    try {
      // 서버에 첫 번째 요청 보내기
      const response = await axios.post(
        "https://27b5-125-131-113-53.ngrok-free.app/v1/chat/completions",
        {
          model: "llm",
          messages: [{ role: "user", content: message }],
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 챗봇 응답을 상태에 추가
      const botMessage = response.data.choices[0].message.content;
      setMessages((prevMessages): any => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);

      // 추가 요청 보내기
      const additionalResponse = await axios.post(
        "https://27b5-125-131-113-53.ngrok-free.app/v1/chat/completions",
        {
          model: "classifier",
          messages: [{ role: "user", content: botMessage }],
          temperature: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 추가 요청의 content 부분만 출력
      const additionalContent =
        additionalResponse.data.choices[0].message.content;
      console.log(additionalContent);

      // 특정 단어가 포함되어 있는지 확인
      const containsLawTerm = lawTerms.some((term) =>
        additionalContent.includes(term)
      );
      if (containsLawTerm) {
        // 특정 단어가 포함된 경우 추가 API 요청
        const apiResponse = await axios.get(
          `http://lawmate-api-gateway-41bd9-25937505-8ab9cf98a540.kr.lb.naverncp.com/lawyers/law?law=${lawTerms.find(
            (term) => additionalContent.includes(term)
          )}`
        );

        // 응답에서 id와 name 출력
        apiResponse.data.forEach((lawyer: any) => {
          console.log(`id: ${lawyer.id}, name: ${lawyer.name}`);
        });
      }
    } catch (error) {
      console.error("Error while sending message:", error);
      setMessages((prevMessages): any => [
        ...prevMessages,
        { sender: "bot", text: "응답을 받을 수 없습니다. 다시 시도해 주세요." },
      ]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "flex-end",
      }}
    >
      {/* 메시지 표시 영역 */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          marginBottom: 1,
        }}
      >
        {messages.map((msg: any, index) => (
          <Box key={index} sx={{ marginBottom: 1 }}>
            <strong>{msg.sender === "user" ? "유저" : "챗봇"}: </strong>
            <span>{msg.text}</span>
          </Box>
        ))}
      </Box>

      {/* 입력창 영역 */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="메시지를 입력하세요"
          {...register("message", { required: "메시지를 입력해주세요." })}
        />
        <Button type="submit" variant="contained">
          전송
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
