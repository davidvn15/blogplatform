FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/post-service/target/post-service-*.jar ./post-service.jar

ENTRYPOINT ["java","-jar","/app/post-service.jar"]

EXPOSE 8094/tcp
