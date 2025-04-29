FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/config-server/target/config-server-*.jar ./config-server.jar

COPY ../../../backend/config-server/src/main/resources/configurations ./configurations

ENTRYPOINT ["java","-jar","/app/config-server.jar"]

EXPOSE 8888/tcp