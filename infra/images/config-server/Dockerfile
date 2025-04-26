FROM openjdk:21-oraclelinux8

WORKDIR /app

COPY ../../../backend/config-server/target/config-server-*.jar ./config-server.jar

ENTRYPOINT ["java","-jar","/app/config-server.jar"]

EXPOSE 8888/tcp