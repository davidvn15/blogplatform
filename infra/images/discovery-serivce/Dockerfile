FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/discovery-service/target/discovery-service-*.jar ./discovery-service.jar

ENTRYPOINT ["java","-jar","/app/discovery-service.jar"]

EXPOSE 8761/tcp