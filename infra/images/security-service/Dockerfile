FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/security-service/target/security-service-*.jar ./security-service.jar

ENTRYPOINT ["java","-jar","/app/security-service.jar"]

EXPOSE 8081/tcp