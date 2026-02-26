FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# give permission to maven wrapper
RUN chmod +x mvnw

# build jar
RUN ./mvnw clean package -DskipTests

# run jar automatically (no need to guess jar name)
CMD java -jar target/*.jar