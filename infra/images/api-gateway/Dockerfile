FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/api-gateway/target/api-gateway-*.jar ./api-gateway.jar

ENTRYPOINT ["java","-jar","/app/api-gateway.jar"]

EXPOSE 9091/tcp