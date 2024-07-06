const courses = {
    'Math 120': {
        professors: ['Dr. Camacho', 'Dr. Bekyel'],
        topics: ['Algebra', 'Trigonometry', 'Precalculus']
    },
    'Math 124': {
        professors: ['Dr. Camacho', 'Dr. Ostroff'],
        topics: ['Limits', 'Derivative Rules', 'Parametric Equations', 'Optimization', 'Related Rates', 'L\'Hopitals Rule', 'Linear Approximation', 'Maximum and Minumum Values', 'Curve Sketching']
    },
    'Math 125': {
        professors: ['Dr. Burdzy', 'Dr. Loveless'],
        topics: ['Anti-Derivatives', 'Reimann Sums', 'Definite Integrals', 'Fundamental Theorem of Calculus', 'Applications of Integration (Area, Volume, Work, Average Value)', 'Techniques of Integration', 'Arc Length', 'Centre of Mass', 'Differential Equations']
    },
    'Math 126': {
        professors: ['Dr. Loveless', 'Dr. Ostroff'],
        topics: ["Vectors", "3D Shapes / Curves", "Lines and Planes", "Vector Functions", "Partial Derivatives", "Double Integrals", "Applications of Double Integrals", "Taylor Series"]
    }
};

const downloadPdfButton = document.querySelectorAll('.downloadPdfButton');

document.addEventListener('DOMContentLoaded', () => {
    // Populate year checkboxes
    const yearFieldset = document.getElementById('year-fieldset');
    for (let year = 2017; year <= 2024; year++) {
        const label = document.createElement('label');
        label.textContent = year;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = year;
        checkbox.name = 'year';
        yearFieldset.appendChild(label);
        yearFieldset.appendChild(checkbox);
    }

    // Populate professors and topics based on selected course
    const courseSelect = document.getElementById('course');
    const professorSelect = document.getElementById('professor');
    const topicSelect = document.getElementById('topic');

    courseSelect.addEventListener('change', () => {
        const selectedCourse = courseSelect.value;
        console.log(`Selected course: ${selectedCourse}`); // Debugging line
        if (selectedCourse) {
            updateDropdown(professorSelect, courses[selectedCourse].professors);
            updateDropdown(topicSelect, courses[selectedCourse].topics);
        } else {
            professorSelect.innerHTML = '<option value="">Select a professor</option>';
            topicSelect.innerHTML = '<option value="">Select a topic</option>';
        }
    });

    // Trigger change event to populate dropdowns on page load
    courseSelect.dispatchEvent(new Event('change'));

    // Handle form submission
    document.getElementById('question-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const course = courseSelect.value;
        const professor = professorSelect.value;
        const topic = topicSelect.value;
        const selectedYears = Array.from(document.querySelectorAll('input[name="year"]:checked')).map(checkbox => checkbox.value);


        if (course && professor && topic && selectedYears.length > 0) {
            const formData = {
                course: course,
                professor: professor,
                topic: topic,
                years: selectedYears,
            };
            
            console.log(formData);

            downloadPdfButton.forEach(button => {
                button.style.display = 'inline-block';
            });
            questionBank.style.display = 'inline-block';
        }

        document.getElementById('question-form').reset();
        courseSelect.dispatchEvent(new Event('change')); // Reset dependent dropdowns
        
    });
});

function updateDropdown(selectElement, options) {
    selectElement.innerHTML = '<option value="">Select an option</option>';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

downloadPdfButton.forEach(button => {
    button.addEventListener('click', () => {
        const pdfUrl = 'output.pdf'; // Replace with the actual path to your PDF file

        // Create a temporary <a> element to initiate the download
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'customized-question-bank.pdf'; // Optional: Set a custom file name for download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
});
