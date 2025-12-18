# Feature Showcase - Winter Assignment 3

## 🎯 Quick Demo Guide

This guide helps you quickly demonstrate all the new features implemented for Winter Assignment 3.

---

## Feature 1: Multiple Language Support 🌐

### Demo Steps

1. **Create a Python File**
   ```
   - Click "New File"
   - Name it: hello.py
   - Notice language automatically set to Python
   ```

2. **Write Python Code**
   ```python
   # Simple Python example
   def greet(name):
       return f"Hello, {name}!"
   
   print(greet("World"))
   print("Python is running!")
   
   # Math operations
   numbers = [1, 2, 3, 4, 5]
   print(f"Sum: {sum(numbers)}")
   print(f"Average: {sum(numbers) / len(numbers)}")
   ```

3. **Run the Code**
   - Click "Run Code" button
   - See output in console panel
   - Notice execution time displayed

4. **Try C++ Code**
   ```
   - Create new file: hello.cpp
   - Language auto-detected as C++
   ```
   
   ```cpp
   #include <iostream>
   using namespace std;
   
   int main() {
       cout << "Hello from C++!" << endl;
       
       // Simple calculation
       int sum = 0;
       for(int i = 1; i <= 10; i++) {
           sum += i;
       }
       cout << "Sum of 1-10: " << sum << endl;
       
       return 0;
   }
   ```

5. **Switch Languages Manually**
   - Use language dropdown in toolbar
   - Select different language
   - Notice syntax highlighting changes

### Supported Languages Demo

**JavaScript** (Browser execution - instant):
```javascript
console.log("Hello from JavaScript!");
const arr = [1, 2, 3, 4, 5];
console.log("Sum:", arr.reduce((a, b) => a + b));
```

**Python** (Piston API):
```python
print("Hello from Python!")
print([x**2 for x in range(5)])
```

**C++** (Piston API):
```cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```

**Java** (Piston API):
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}
```

**Go** (Piston API):
```go
package main
import "fmt"

func main() {
    fmt.Println("Hello from Go!")
}
```

---

## Feature 2: Version History 📚

### Demo Steps

1. **Create Initial Version**
   ```javascript
   // Version 1: Basic function
   function add(a, b) {
       return a + b;
   }
   console.log(add(2, 3));
   ```
   - Wait 1 second for auto-save
   - Version 1 created automatically

2. **Make Changes**
   ```javascript
   // Version 2: Add validation
   function add(a, b) {
       if (typeof a !== 'number' || typeof b !== 'number') {
           return 'Invalid input';
       }
       return a + b;
   }
   console.log(add(2, 3));
   console.log(add('2', 3));
   ```
   - Wait for auto-save
   - Version 2 created

3. **Make More Changes**
   ```javascript
   // Version 3: Add more operations
   function calculate(a, b, operation) {
       if (typeof a !== 'number' || typeof b !== 'number') {
           return 'Invalid input';
       }
       switch(operation) {
           case 'add': return a + b;
           case 'subtract': return a - b;
           case 'multiply': return a * b;
           case 'divide': return b !== 0 ? a / b : 'Cannot divide by zero';
           default: return 'Unknown operation';
       }
   }
   console.log(calculate(10, 5, 'add'));
   console.log(calculate(10, 5, 'multiply'));
   ```
   - Wait for auto-save
   - Version 3 created

4. **View Version History**
   - Click "History" button in toolbar
   - See all 3 versions listed
   - Each shows:
     - Version number (v1, v2, v3)
     - Timestamp
     - Line count
     - Description

5. **Restore Previous Version**
   - Click restore icon (↻) on Version 1
   - Code reverts to original simple function
   - Can run the restored code
   - Save to create Version 4 from restored code

6. **Delete a Version** (optional)
   - Click trash icon on any version
   - Confirm deletion
   - Version removed from history

### Version History Benefits

- ✅ Never lose your work
- ✅ Experiment freely (can always go back)
- ✅ Track your progress
- ✅ Compare different approaches
- ✅ Recover from mistakes

---

## Feature 3: Shareable Snippet Links 🔗

### Demo Steps

1. **Create Code to Share**
   ```javascript
   // Fibonacci sequence generator
   function fibonacci(n) {
       if (n <= 1) return n;
       return fibonacci(n - 1) + fibonacci(n - 2);
   }
   
   // Generate first 10 Fibonacci numbers
   console.log("Fibonacci sequence:");
   for (let i = 0; i < 10; i++) {
       console.log(`F(${i}) = ${fibonacci(i)}`);
   }
   ```

2. **Create Share Link**
   - Click "Share" button in toolbar
   - Share dialog opens
   - See expiration options:
     - Never (link works forever)
     - 1 Day (expires in 24 hours)
     - 7 Days (expires in 1 week)
     - 30 Days (expires in 1 month)

3. **Select Expiration**
   - Choose "7 Days" for demo
   - Click "Create Share Link"
   - Unique URL generated

4. **Copy and Share**
   - Click "Copy Link" button
   - Link copied to clipboard
   - Or click "Open in New Tab" to preview

5. **View Shared Snippet**
   - Open the share URL
   - See beautiful public view with:
     - Code with syntax highlighting
     - File name
     - Programming language
     - Creation date
     - View count
     - "Open IDE" button

6. **Track Views**
   - Refresh the share page
   - Notice view count increments
   - Each unique visit counted

### Share Use Cases

**For Students:**
- Share homework solutions with classmates
- Get help by sharing problematic code
- Collaborate on group projects
- Submit code snippets to instructors

**For Teachers:**
- Share code examples with students
- Provide starter code for assignments
- Demonstrate solutions
- Create code libraries

**For Developers:**
- Share code snippets on social media
- Include in documentation
- Quick code sharing in chat
- Portfolio examples

---

## Combined Feature Demo 🎭

### Complete Workflow

1. **Start a New Project**
   ```
   - Create project: "Algorithm Practice"
   - Create file: sorting.py
   ```

2. **Write Initial Code**
   ```python
   # Bubble sort implementation
   def bubble_sort(arr):
       n = len(arr)
       for i in range(n):
           for j in range(0, n-i-1):
               if arr[j] > arr[j+1]:
                   arr[j], arr[j+1] = arr[j+1], arr[j]
       return arr
   
   numbers = [64, 34, 25, 12, 22, 11, 90]
   print("Original:", numbers)
   print("Sorted:", bubble_sort(numbers.copy()))
   ```
   - Language: Python (auto-detected)
   - Run to verify it works
   - Version 1 created automatically

3. **Improve the Code**
   ```python
   # Optimized bubble sort with early termination
   def bubble_sort(arr):
       n = len(arr)
       for i in range(n):
           swapped = False
           for j in range(0, n-i-1):
               if arr[j] > arr[j+1]:
                   arr[j], arr[j+1] = arr[j+1], arr[j]
                   swapped = True
           if not swapped:
               break
       return arr
   
   # Test with different arrays
   test_cases = [
       [64, 34, 25, 12, 22, 11, 90],
       [1, 2, 3, 4, 5],  # Already sorted
       [5, 4, 3, 2, 1],  # Reverse sorted
   ]
   
   for i, arr in enumerate(test_cases):
       print(f"Test {i+1}:")
       print(f"  Original: {arr}")
       print(f"  Sorted: {bubble_sort(arr.copy())}")
   ```
   - Run to verify improvements
   - Version 2 created automatically

4. **View Version History**
   - Click "History" button
   - See both versions
   - Compare the changes

5. **Share the Solution**
   - Click "Share" button
   - Select "Never" expiration
   - Create share link
   - Copy link to share with others

6. **Switch to Different Language**
   - Create new file: sorting.cpp
   - Implement same algorithm in C++
   - Run and compare performance

---

## Performance Comparison Demo 🏃

### JavaScript vs Python Speed Test

**JavaScript** (browser execution):
```javascript
console.time("Execution");
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}
console.log("Sum:", sum);
console.timeEnd("Execution");
```
- Executes instantly (< 100ms)

**Python** (Piston API):
```python
import time
start = time.time()
total = sum(range(1000000))
end = time.time()
print(f"Sum: {total}")
print(f"Time: {(end-start)*1000:.2f}ms")
```
- Executes in 1-3 seconds (includes API call)

---

## Error Handling Demo 🚨

### Syntax Errors

**Python with error**:
```python
print("Hello"
# Missing closing parenthesis
```
- Run → See error message in console
- Error clearly displayed

**C++ with error**:
```cpp
#include <iostream>
int main() {
    std::cout << "Hello" << std::endl
    // Missing semicolon
    return 0;
}
```
- Run → See compilation error
- Error message from compiler

### Runtime Errors

**Python division by zero**:
```python
def divide(a, b):
    return a / b

print(divide(10, 0))
```
- Run → See runtime error
- Error caught and displayed

---

## Tips for Best Demo 💡

### Preparation

1. **Clear Browser Cache**
   - Ensure fresh start
   - No cached data

2. **Have Examples Ready**
   - Prepare interesting code snippets
   - Test beforehand

3. **Explain As You Go**
   - Narrate each action
   - Highlight key features

### Demo Flow

1. **Start Simple**
   - Basic "Hello World" in multiple languages
   - Show language switching

2. **Show Version History**
   - Make incremental changes
   - Demonstrate restore

3. **Create Share Link**
   - Share interesting code
   - Show public view

4. **Highlight Benefits**
   - Multi-language support
   - Never lose work
   - Easy sharing

### Common Questions

**Q: How many languages are supported?**
A: 10 languages - JavaScript, Python, C++, C, Java, TypeScript, Go, Rust, Ruby, PHP

**Q: How long are versions kept?**
A: Forever (no automatic deletion)

**Q: Can shared links be edited?**
A: No, they're read-only. Click "Open IDE" to create your own copy.

**Q: Is there a limit on code length?**
A: Reasonable limits apply (Piston API has timeout of 10 seconds)

**Q: Does it work offline?**
A: JavaScript execution works offline. Other languages require internet for Piston API.

---

## Troubleshooting Demo Issues 🔧

### Issue: Code Not Executing

**Solution:**
- Check internet connection (for non-JavaScript)
- Verify syntax is correct
- Check console for errors

### Issue: Version Not Created

**Solution:**
- Wait 1 second after editing
- Ensure file is selected
- Check auto-save indicator

### Issue: Share Link Not Working

**Solution:**
- Verify link was copied correctly
- Check expiration date
- Try opening in incognito mode

---

## Conclusion

This showcase demonstrates:
- ✅ Multi-language code execution
- ✅ Automatic version control
- ✅ Easy code sharing
- ✅ Professional IDE features
- ✅ User-friendly interface

**Ready to impress!** 🌟

---

*For detailed technical documentation, see WINTER_ASSIGNMENT_FEATURES.md*
