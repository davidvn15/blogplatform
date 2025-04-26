FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/email-service/target/email-service-*.jar ./email-service.jar

ENTRYPOINT ["java","-jar","/app/email-service.jar"]

EXPOSE 8093/tcp