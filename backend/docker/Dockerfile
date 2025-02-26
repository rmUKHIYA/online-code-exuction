# Use Ubuntu as the base image
FROM ubuntu:latest

# Install dependencies (Python, Node.js, OpenJDK for Java, GCC for C/C++)
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    nodejs npm \
    openjdk-17-jdk \
    gcc g++ \
    && apt-get clean

# Set working directory
WORKDIR /app

# Default command (this will be overridden)
CMD ["/bin/bash"]
