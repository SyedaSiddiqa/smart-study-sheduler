# StudyFlow — Smart Study Scheduler
## 4th Semester Analysis of Algorithms Project

A modern, algorithm-powered study session scheduler that optimizes your exam preparation using advanced interval scheduling techniques.

## 🎓 Academic Project Context

**StudyFlow** is a 4th semester Analysis of Algorithms project that demonstrates:

### Algorithms Covered
1. **Activity Selection Problem** (Greedy Algorithm)
   - Proof of correctness
   - Time complexity: O(n log n)
   - Maximize number of non-overlapping intervals

2. **Weighted Interval Scheduling** (Dynamic Programming)
   - Binary search optimization
   - Time complexity: O(n log n)
   - Maximize total weight/priority value

3. **Interval Partitioning** (Graph Coloring)
   - Greedy assignment strategy
   - Time complexity: O(n log n)
   - Minimum resources for all intervals

### Learning Outcomes
✓ Greedy algorithm design and proof techniques  
✓ Dynamic programming with optimization  
✓ Interval graph problems and properties  
✓ Algorithm complexity analysis (Big-O notation)  
✓ Full-stack implementation (algorithms → UI)  

---

## 🚀 Features

- **Three Scheduling Algorithms**
  - **Greedy Scheduling**: Maximize the number of study sessions (Activity Selection Problem)
  - **Weighted DP**: Prioritize high-importance exams based on priority scores
  - **Interval Partitioning**: Distribute all sessions across minimum parallel study tracks

- **Interactive Session Management**
  - Add, edit, and remove study sessions
  - Set custom time blocks and priority levels (P1-P4)
  - Real-time session counter and overview stats

- **Visual Study Plan**
  - Timeline visualization with color-coded sessions
  - Priority legend for quick reference
  - Partition tracks for multi-track scheduling
  - Detailed plan list with time badges

- **Data Management**
  - Load sample data instantly
  - Export your study plan as text
  - Clear and reset functionality

- **Dual Theme Support** ✨
  - **Dark Mode**: Modern dark theme with yellow (#E1E289) accents
  - **Light Mode**: Clean light theme with burgundy (#3D0814) accents
  - Theme preference saved to localStorage
  - Toggle button in top-right corner (🌙/☀️)
  - Responsive design for mobile and desktop
  - Smooth animations and transitions

## 🚀 How to Use

### 1. Add Sessions
- Click **"+ Add session"** or use the sidebar quick action
- Enter subject/topic name
- Set start and end times
- Select priority level (P1=Critical, P2=High, P3=Medium, P4=Low)

### 2. Choose Algorithm
- Go to the **Algorithm** tab
- Select your preferred scheduling strategy
- Review the algorithm comparison table
- Click **"Generate Plan"**

### 3. View Results
- Timeline visualization shows all scheduled sessions
- Plan list displays sessions in optimal order
- Deferred sessions (if any) appear separately
- Export your plan as a text file

## 🧠 Algorithm Details

| Algorithm | Approach | Complexity | Drops Sessions? | Best For |
|-----------|----------|-----------|-----------------|----------|
| **Greedy** | Sort by finish time, greedily select non-overlapping | O(n log n) | Yes | Equal-weight sessions |
| **Weighted DP** | Dynamic programming + binary search | O(n log n) | Yes | Priority-based exams |
| **Partitioning** | Assign to min parallel tracks | O(n log n) | No | Multi-track scheduling |

## 💾 Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Fonts**: Syne (headings), DM Sans (body)
- **Architecture**: Single-page app with modular views
- **Theme**: Dark mode with #E1E289 accent and #3D0814 surface colors

## 📁 File Structure

```
StudyFlow/
├── index.html      # Main HTML structure
├── style.css       # Complete dark theme styling
├── script.js       # Algorithm implementations & UI logic
└── README.md       # This file
```

## 🎨 Color Palette

### Dark Theme
- **Primary Accent**: #E1E289 (Bright Yellow)
- **Surface**: #1A1A1A (Dark Gray)
- **Background**: #0A0A0A (Pure Black)
- **Highlights**: #3D0814 (Burgundy)
- **Text**: #E1E289 (Yellow)

### Light Theme
- **Primary Accent**: #3D0814 (Burgundy)
- **Surface**: #FFFFFF (White)
- **Background**: #F6F7FB (Light Gray)
- **Highlights**: #E1E289 (Yellow)
- **Text**: #3D0814 (Dark)

**Status Colors (Both Themes)**
- Green: #4ADE80 / #34D399
- Amber: #FBF124 / #FBBF24
- Red: #FF6B6B / #F87171
- Blue: #60A5FA

## 🛠️ Customization

### Theme Toggle Feature
StudyFlow includes built-in theme switching:
- Click the theme button (🌙/☀️) in the top-right corner
- Theme preference is saved to browser's localStorage
- Automatically loads your preferred theme on next visit

### Changing Colors
Edit the CSS variables in `style.css`:

**Dark Theme:**
```css
html {
  --accent: #e1e289;        /* Yellow accent */
  --surface: #1a1a1a;       /* Card backgrounds */
  --text: #e1e289;          /* Text color */
  --bg: #0a0a0a;            /* Main background */
}
```

**Light Theme:**
```css
html[data-theme="light"] {
  --accent: #3d0814;        /* Burgundy accent */
  --surface: #ffffff;       /* Card backgrounds */
  --text: #3d0814;          /* Text color */
  --bg: #f6f7fb;            /* Main background */
}
```

### Adding More Algorithms
Extend the `algorithms` object in `script.js` with your scheduling logic.

## 📱 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Future Enhancements

- [ ] Conflict detection and warnings
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Recurring sessions
- [ ] Exam countdown timer
- [ ] Progress tracking
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] PDF export

## 📄 License

MIT License - Feel free to use and modify for personal projects.

---

**Made with 💛 for students who want to study smarter, not harder.**
