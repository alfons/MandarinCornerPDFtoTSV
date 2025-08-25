<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Mandarin Corner PDF to TSV Converter</title>
    <style>
        body {
            font-family: American Typewriter, Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0 20px 40px;
            line-height: 1.6;
            background-color: #fad968;
            opacity: 0.8;
            background-image: radial-gradient(#c6c6c6 0.5px, transparent 0.5px), radial-gradient(#777676 0.5px, #fad968 0.5px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }

        h1,
        h2 {
            text-align: center;
        }

        h1 {
            font-size: 2.2em;
            margin: 40px 0 20px;
            color: #222;
        }

        header {
            max-width: 800px;
            margin: 0 auto 30px;
            font-size: 1.05em;
            text-align: center;
            color: #444;
        }

        details {
            max-width: 900px;
            margin: 0 auto 40px;
            background: #fff;
            border-radius: 10px;
            padding: 20px 25px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        summary {
            font-weight: bold;
            font-size: 1.2em;
            cursor: pointer;
            list-style: none;
            outline: none;
        }

        summary::marker {
            display: none;
        }

        summary::after {
            content: " ▼";
            font-size: 0.9em;
            transition: transform 0.3s ease;
            display: inline-block;
        }

        details[open] summary::after {
            transform: rotate(-180deg);
        }

        .step {
            margin: 30px 0;
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }

        .step img {
            width: 180px;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .step-text {
            flex: 1;
        }

        .step-text h2 {
            margin: 0 0 10px;
            font-size: 1.2em;
            color: #222;
        }

        .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
            flex-wrap: wrap;
        }

        textarea {
            width: 45%;
            min-width: 280px;
            height: 300px;
            padding: 15px;
            font-size: 1rem;
            border-radius: 8px;
            border: 1px solid #ccc;
            background: #fff;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
            resize: none;
        }

        textarea:focus {
            border-color: #0077cc;
            outline: none;
        }

        #copyButton {
            display: block;
            margin: 20px auto 0;
            padding: 12px 24px;
            font-size: 1rem;
            background-color: #888;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: not-allowed;
            transition: background-color 0.3s ease;
        }

        #copyButton.enabled {
            background-color: #28a745;
            cursor: pointer;
        }

        #copyButton.copied {
            background-color: #218838;
        }

        footer {
            margin-top: 60px;
            font-size: 0.9em;
            color: #555;
            text-align: center;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.5;
        }

        #error {
            display: none;
        }
    </style>
</head>

<body>

    <h1>Mandarin Corner PDF to TSV Converter</h1>

    <header>
        <p>This tool helps students convert Mandarin Corner PDF transcripts into spreadsheet-friendly Tab-Separated
            Values (TSV) format. It filters out PDF-specific lines and organizes the content neatly into rows and
            columns.</p>
    </header>

    <details>
        <summary>Tutorial: Step-by-step guide</summary>
        <div class="step">
            <img src="images/mandarincorner_signup.jpg" alt="Sign up thumbnail">
            <div class="step-text">
                <h2>1. Sign up</h2>
                <p>Become a member of <strong><a href="https://mandarincorner.org"
                            target="_blank">mandarincorner.org</a></strong>.</p>
            </div>
        </div>

        <div class="step">
            <img src="images/mandarincorner_download.jpg" alt="Download PDF thumbnail">
            <div class="step-text">
                <h2>2. Choose a PDF</h2>
                <p>Log in and open a PDF you'd like to study.</p>
            </div>
        </div>

        <div class="step">
            <img src="images/mandarincorner_select.jpg" alt="Copy text thumbnail">
            <div class="step-text">
                <h2>3. Copy the text from the PDF</h2>
                <p>Open the PDF and select all text.</p>
                <p><strong>Mac:</strong> <code>Cmd + A</code> → <code>Cmd + C</code><br>
                    <strong>Windows:</strong> <code>Ctrl + A</code> → <code>Ctrl + C</code>
                </p>
            </div>
        </div>

        <div class="step">
            <img src="images/mandarincorner_converted.jpg" alt="Converted output thumbnail">
            <div class="step-text">
                <h2>4. Paste into the INPUT box</h2>
                <p>The text will be cleaned and TSV-formatted automatically. See the result in the OUTPUT box.</p>
            </div>
        </div>

        <div class="step">
            <img src="images/mandarincorner_spreadsheet.jpg" alt="Paste into spreadsheet thumbnail">
            <div class="step-text">
                <h2>5. Paste into spreadsheet</h2>
                <p>Copy the TSV to Clipboard and paste it into Apple Numbers, Microsoft Excel, or LibreOffice.</p>
            </div>
        </div>

        <div class="step">
            <img src="images/deepl.jpg" alt="Translation thumbnail">
            <div class="step-text">
                <h2>A. Use case example: Add new translations</h2>
                <p>Now that everything is neatly organised in a Spreadsheet, you can easily get new translations with
                    the help of DeepL, Google translate, etc.</p>
            </div>
        </div>

        <div class="step">
            <img src="images/mandarincorner_ebook.jpg" alt="Kindle creation thumbnail">
            <div class="step-text">
                <h2>B. Use case example: Create a private Kindle ebook</h2>
                <p>Format and export as needed to make your own personal ebook for Kindle (or other e-reading platforms.)
                    Be aware that Mandarin Corner content is copyright and only for Mandarin Corner members.</p>
            </div>
        </div>

        <div class="step">
            <a href="https://papperlapapp.gumroad.com/l/pinyin-english-dictionary" target="_blank">
                <img src="images/alfons_pinyin_english_dictionary_cover.jpg" alt="Dictionary cover thumbnail">
            </a>
            <div class="step-text">
                <h2>Chinese Pinyin dictionary for Kindle</h2>
                <p>Get the Chinese Pinyin-English Dictionary on
                    <a href="https://papperlapapp.gumroad.com/l/pinyin-english-dictionary" target="_blank">Gumroad</a>
                    for convenient word look-up on Kindle.
                </p>
            </div>
        </div>


        <div class="step">
            <img src="images/copyright.jpg" alt="Copyright notice">
            <div class="step-text">
                <h2>Respect copyright</h2>
                <p>All Mandarin Corner material is copyright protected. Use it strictly for personal study only. Do not
                    distribute
                    or share. Please support Mandarin Corner by maintaining your membership.</p>
            </div>
        </div>
    </details>

    <h2>Mandarin Corner PDF to TSV Converter</h2>

    <div class="container">
        <textarea id="input" placeholder="INPUT: Paste PDF text here..."></textarea>
        <textarea id="output" placeholder="OUTPUT: Converted TSV will appear here..." readonly></textarea>
    </div>

    <button id="copyButton" disabled>Copy to Clipboard</button>

    <footer>
        <p>This tool was independently created for personal study purposes. It is not affiliated with, endorsed by, or
            officially approved by <a href="https://mandarincorner.org" target="_blank">mandarincorner.org</a>. All
            rights to the original PDF content remain with Mandarin Corner. Please use this tool responsibly and only
            for your own private learning as a Mandarin Corner member.</p>
        <p style="margin-top: 1em;">Created by <a href="https://alfonsgrabher.com" target="_blank">Alfons Grabher</a>.
        </p>
    </footer>

    <div id="error" style="color: red; margin-top: 10px; font-size: 0.9em; text-align: center;"></div>
    <script src="MandarinCornerPDFtoTSV.js"></script>
    <script>
        const converter = new MandarinCornerPDFtoTSV({
            inputElement: document.getElementById('input'),
            outputElement: document.getElementById('output'),
            copyButtonElement: document.getElementById('copyButton'),
            errorElement: document.getElementById('error')
        });
    </script>

</body>

</html>
