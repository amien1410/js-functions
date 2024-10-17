import { randomUUID } from 'crypto';
import { customAlphabet } from 'nanoid';
import * as crypto from 'crypto';

class UniqueIdGenerator {
  // 1. UUID Method (Standard UUID v4)
  generateUUID(): string {
    const uuid = randomUUID();
    return uuid;
    // Result example: "123e4567-e89b-12d3-a456-426614174000"
  }

  // 2. Timestamp-based Method
  generateTimestampId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
    // Result example: "1697548934231-7b9f1d3a"
  }

  // 3. Nanoid Method (Customizable length and characters)
  generateNanoId(length: number = 12): string {
    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length);
    return nanoid();
    // Result example: "7dX9sK3vN1pQ"
  }

  // 4. Structured Method (with prefix and timestamp)
  generateStructuredId(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${timestamp}-${random}`;
    // Result example: "user-1697548934231-x7y2z9"
  }

  // 5. Hash-based Method (using content)
  generateHashId(content: string): string {
    const hash = crypto.createHash('sha256')
      .update(content)
      .digest('hex')
      .substring(0, 12);
    return hash;
    // Result example: "7dfa8c9b3e2a"
  }

  // 6. Short UUID (First part of UUID)
  generateShortUUID(): string {
    return randomUUID().split('-')[0];
    // Result example: "123e4567"
  }

  // 7. Custom Format (Timestamp + Random + Sequence)
  generateCustomFormat(): string {
    const timestamp = Date.now().toString(36); // Base36 timestamp
    const random = Math.random().toString(36).substring(2, 5);
    const sequence = (Math.floor(Math.random() * 1000)).toString().padStart(3, '0');
    return `${timestamp}-${random}-${sequence}`;
    // Result example: "lq1roky-j4k-042"
  }

  // 8. URL-Safe Base64 Random
  generateUrlSafeId(length: number = 16): string {
    const bytes = crypto.randomBytes(length);
    return bytes.toString('base64url');
    // Result example: "dW5pcXVlaWRnZW5lcmF0b3I"
  }
}

// Test script to demonstrate all methods
async function demonstrateIdGenerators() {
  const generator = new UniqueIdGenerator();
  const sampleContent = "Hello, World!";
  
  // Generate multiple examples of each type
  const examples = {
    uuid: Array(3).fill(null).map(() => generator.generateUUID()),
    timestampId: Array(3).fill(null).map(() => generator.generateTimestampId()),
    nanoId: Array(3).fill(null).map(() => generator.generateNanoId()),
    structuredId: Array(3).fill(null).map(() => generator.generateStructuredId('user')),
    hashId: Array(3).fill(null).map(() => generator.generateHashId(sampleContent + Date.now())),
    shortUUID: Array(3).fill(null).map(() => generator.generateShortUUID()),
    customFormat: Array(3).fill(null).map(() => generator.generateCustomFormat()),
    urlSafeId: Array(3).fill(null).map(() => generator.generateUrlSafeId())
  };

  // Format and display results
  console.log('ID Generation Examples:\n');
  
  Object.entries(examples).forEach(([method, ids]) => {
    console.log(`${method}:`);
    ids.forEach((id, index) => {
      console.log(`  Example ${index + 1}: ${id}`);
    });
    console.log('  Length:', ids[0].length);
    console.log();
  });

  // Demonstrate practical file naming
  const fileNamingExamples = {
    basic: `uploads/${generator.generateUUID()}-image.jpg`,
    structured: `uploads/2023/10/user-123/${generator.generateShortUUID()}-profile.jpg`,
    timestampBased: `uploads/${Date.now()}-${generator.generateUrlSafeId(8)}-document.pdf`,
    categoryBased: `uploads/images/profile/${generator.generateNanoId()}-avatar.png`
  };

  console.log('File Naming Examples:\n');
  Object.entries(fileNamingExamples).forEach(([type, path]) => {
    console.log(`${type}:`);
    console.log(`  ${path}`);
    console.log();
  });
}

// Run the demonstration
demonstrateIdGenerators();
