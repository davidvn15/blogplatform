FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/user-service/target/user-service-*.jar ./user-service.jar

ENTRYPOINT ["java","-jar","/app/user-service.jar"]

EXPOSE 8092/tcp