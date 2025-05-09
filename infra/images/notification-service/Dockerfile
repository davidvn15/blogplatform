FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../backend/notification-service/target/*.jar ./notification-service.jar

ENTRYPOINT ["java","-jar","/app/notification-service.jar"]

EXPOSE 8085/tcp