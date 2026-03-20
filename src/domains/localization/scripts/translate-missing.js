#!/usr/bin/env node

/**
 * Translate Missing Script
 * Automatically translates missing strings using Google Translate
 * Refactored to use @umituz/react-native-google-translate package
 */

import fs from 'fs';
import path from 'path';
import { parseTypeScriptFile, generateTypeScriptContent } from './utils/file-parser.js';
import {
  googleTranslateService,
  getTargetLanguage,
  getLanguageDisplayName,
} from '@umituz/react-native-google-translate/services';
import { setupLanguages } from './setup-languages.js';
import { syncTranslations } from './sync-translations.js';

async function translateMissing(targetDir, srcDir) {
  // Initialize the translation service
  googleTranslateService.initialize({
    minDelay: 100,
    maxRetries: 3,
    timeout: 10000,
  });

  const localesDir = path.resolve(process.cwd(), targetDir);
  const enUSPath = path.join(localesDir, 'en-US.ts');

  const skipSync = process.argv.includes('--no-sync');

  if (!fs.existsSync(path.join(localesDir, 'index.ts'))) {
    console.log('🔄 Initializing localization setup...');
    setupLanguages(targetDir);
  }

  if (!skipSync) {
    console.log('\n🔄 Checking synchronization...');
    syncTranslations(targetDir, srcDir);
  } else {
    console.log('\n⏭️ Skipping synchronization check...');
  }

  const files = fs.readdirSync(localesDir)
    .filter(f => f.match(/^[a-z]{2}-[A-Z]{2}\.ts$/) && f !== 'en-US.ts')
    .sort();

  console.log(`\n📊 Languages to translate: ${files.length}\n`);

  const enUS = parseTypeScriptFile(enUSPath);

  for (const file of files) {
    const langCode = file.replace('.ts', '');

    // Skip English variants
    const targetLang = getTargetLanguage(langCode);
    if (!targetLang || targetLang === 'en') {
      console.log(`⏭️ Skipping ${langCode} (English variant)`);
      continue;
    }

    const langName = getLanguageDisplayName(langCode);
    console.log(`🌍 Translating ${langCode} (${langName})...`);

    const targetPath = path.join(localesDir, file);
    const target = parseTypeScriptFile(targetPath);

    const stats = {
      totalCount: 0,
      successCount: 0,
      failureCount: 0,
      skippedCount: 0,
      translatedKeys: [],
    };

    await googleTranslateService.translateObject(
      enUS,
      target,
      targetLang,
      '',
      stats
    );

    // Clear progress line
    process.stdout.write('\r' + ' '.repeat(80) + '\r');

    if (stats.successCount > 0) {
      const content = generateTypeScriptContent(target, langCode);
      fs.writeFileSync(targetPath, content);

      console.log(`      ✅ Successfully translated ${stats.successCount} keys:`);

      // Detailed logging of translated keys
      const displayCount = Math.min(stats.translatedKeys.length, 15);
      stats.translatedKeys.slice(0, displayCount).forEach(item => {
        console.log(`         • ${item.key}: "${item.from}" → "${item.to}"`);
      });

      if (stats.translatedKeys.length > displayCount) {
        console.log(`         ... and ${stats.translatedKeys.length - displayCount} more.`);
      }
    } else {
      console.log(`      ✨ Already up to date.`);
    }
  }

  console.log('\n✅ All translations completed!');
}

const isMainModule = import.meta.url.endsWith('translate-missing.js');
if (isMainModule) {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  const targetDir = args[0] || 'src/domains/localization/infrastructure/locales';
  const srcDir = args[1];
  console.log('🚀 Starting integrated translation workflow...');
  translateMissing(targetDir, srcDir).catch(err => {
    console.error('\n❌ Translation workflow failed:', err.message);
    process.exit(1);
  });
}
