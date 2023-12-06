#!/usr/bin/env node
const dudenBaseUrl = 'https://www.duden.de/rechtschreibung';
const dudenSucheUrl = 'https://www.duden.de/suchen/dudenonline';

async function fetchAsFirefox(url) {
    return await fetch(url, {headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0'}})
}

async function getDudenDirectPage(word) {
    const url = `${dudenBaseUrl}/${word}`;
    console.log('Checking URL:', url);
    const response = await fetchAsFirefox(url);
    return response.text();
}

async function getDudenSearchResultPage(word) {
    const url = `${dudenSucheUrl}/${word}`;
    console.log('Direct URL failed, attempting search with URL:', url)
    const response = await fetchAsFirefox(url);
    return response.text();
}

function extractDeterminerFromDirectPage(html) {
    const determinerRegex = /<span class="lemma__determiner">(?<determiner>der|die|das)<\/span>/;
    return determinerRegex.exec(html)?.groups?.determiner;
}

function extractDeterminerFromSearchResultPage(html) {
    const genderRegex = /Substantiv, (?<gender>maskulin|feminin|Neutrum)/
    const gender = genderRegex.exec(html)?.groups?.gender;
    const genderMap = {maskulin: 'der', feminin: 'die', Neutrum: 'das'};
    return gender ? genderMap[gender] : undefined;
}


function sanitizeWord(word) {
    return word.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('Ä', 'Ae').replace('Ö', 'Oe').replace('Ü', 'Ue');
}

async function getDeterminerFromDirectUrl(word) {
    const html = await getDudenDirectPage(word);
    return extractDeterminerFromSearchResultPage(html);
}

async function getDeterminerFromSearch(word) {
    const html = await getDudenSearchResultPage(word);
    return extractDeterminerFromDirectPage(html);
}

async function logDeterminerForWord(word) {
    const sanitizedWord = sanitizeWord(word);
    if (sanitizedWord !== word) {
        console.log(word, 'sanitized to', sanitizedWord);
    }
    const fromDirectUrl = await getDeterminerFromDirectUrl(sanitizedWord);
    console.log('===>', fromDirectUrl ?? await getDeterminerFromSearch(sanitizedWord) ?? 'NOT FOUND', '<===');
}

const word = process.argv[2]

void logDeterminerForWord(word)