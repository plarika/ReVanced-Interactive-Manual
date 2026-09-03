window.MANUAL_DATA = {
  "meta": {
    "title": "ReVanced Troubleshooting & Recovery Manual",
    "version": "3.0.1 Interactive",
    "baseline": "2.0 PDF",
    "reviewed": "2026-09-01 20:22 Europe/Lisbon",
    "language": "en",
    "disclaimer": "Independent technical edition, not affiliated with the ReVanced project, Google, or YouTube.",
    "lastIssueCheck": "2026-09-03T18:41:03+01:00"
  },
  "chapters": [
    {
      "id": 0,
      "title": "How to use this manual",
      "text": "Start with the quick triage. Then it jumps into the chapter of the phase where the failure occurs. The manual was\ndesigned as runbook, not as a mandatory read sequence.\n\nIf the symptom is... it goes first to...\n\nManager does not install/does not open 4 - Manager Installation; 11 - crashes\n\nPatches do not appear / do not load 7 - sources and safeguards; 9 - dependencies\n\nPatch failure during build 8 - APK and compatibility; 10 - memory/build\n\nAPK patched does not install 12 - signature, package and versionCode\n\nLogin/GmsCore failed 14 - GmsCore and authentication\n\nVideo pause, buffer or error 16-18 - playback and Spoof video streams\n\nProblem started after update 25 - update and rollback\n\nNothing works 26 - total recovery; 27 - logs/ADB\n\n\nOPERATIONAL PROCEDURE\nChange one variable at a time. If you change APK, patch selection, Spoof client, network and GMSCore\nat the same time, you no longer know which change solved or introduced the problem.\n\n\nConfidence levels used\nMeaning Label\n\nOFFICIAL Behavior or procedure documented by the project\nReVanced/Android.\n\nWORKAROUND Plausible or recurrent solution, but dependent on\nversion/device.\n\nVALIDATED CASE It was observed and tested on the device used for this\nmanual; it is not universal guarantee.",
      "search": "how to use this manual\nstart with the quick triage. then it jumps into the chapter of the phase where the failure occurs. the manual was\ndesigned as runbook, not as a mandatory read sequence.\n\nif the symptom is... it goes first to...\n\nmanager does not install/does not open 4 - manager installation; 11 - crashes\n\npatches do not appear / do not load 7 - sources and safeguards; 9 - dependencies\n\npatch failure during build 8 - apk and compatibility; 10 - memory/build\n\napk patched does not install 12 - signature, package and versioncode\n\nlogin/gmscore failed 14 - gmscore and authentication\n\nvideo pause, buffer or error 16-18 - playback and spoof video streams\n\nproblem started after update 25 - update and rollback\n\nnothing results 26 - total recovery; 27 - logs/adb\n\n\noperational programme\nit changes one variable at a time. if you change apk, patch selection, Spoof client, network and gmscore\nat the same time, you no longer know which change solved or introduced the problem.\n\n\nconfidence levels used\nmeaning label\n\nofficer behavior or procedure documented by the project\nrevanced/android.\n\nworkaround plausible or recurrent solution, but dependent on\nversion/device.\n\ncase validated it was observed and tested on the device used for this\nmanual; it is not universal guarantee."
    },
    {
      "id": 1,
      "title": "Diagnosis in 5 minutes",
      "text": "The initial goal is not to correct: to locate the boundary of the failure.\n1. Confirms that the ReVanced Manager came from revanced.app/download or from the official repository.[R1][R12]2. It confirms Android 8.0 (Oreo) or higher, official Manager requirement.[R2]3. In Settings > Advanced, reset safeguards to defaults before diagnosing.[R4][R5]4. Use the suggested version of the application and a full APK, not a bundle/split, unless you know exactly the format\nYou're providing.[R3][R5]5. In the patch selector, use Reset/default. The documentation recommends the default set.[R3]6. If the error occurs before \"Applying patches\", investigates sources/selection; GmsCore isn't the probable cause yet.\n7. If APK patched installs but the app fails to login, investigates GmsCore/authentication.\n8. If the app opens and the problem is video, investigates playback/Spoof video streams and only then network/battery.\n9. If the problem persists, export logs before wiping data or reinstalling everything.[R4][R7]Indicator Phase First hypothesis\n\n\nLoad patches error \"Patch... does not exist\" / source selection, dependency, source or API of\nunavailable patches\n\nPatching error during transformation/compilation incompatible version, patch option,\nmemory, bundle\n\nSigning ends build but update fails keystore/certificate different\n\nInstall \"App not installed\" / downgrade signature, package, versionCode, profile\n\nRuntime crash on patch/configuration/app/OS\n\nAuth does not enter the GmsCore account, version, account/network\n\nPlayback buffer, 403, pause ~1.00 Spoof video streams/client, patches\noutdated",
      "search": "diagnosis in 5 minutes\nthe initial goal is not to correct: to locate the boundary of the failure.\n1. confirms that the revanced manager came from revanced.app/download or from the official repository.[r1][r12]2. it confirms android 8.0 (oreo) or higher, official manager requirement.[r2]3. in settings > advanced, reset safeguards to defaults before diagnosing.[r4][r5]4. use the suggested version of the application and a full apk, not a bundle/split, unless you know exactly the format\nyou're providing.[r3][r5]5. in the patch selector, use reset/default. the documentation recommends the default set.[r3]6. if the error occurs before \"applying patches\", investigates sources/selection; gmscore isn't the probable cause yet.\n7. if apk patched installs but the app fails to login, investigates gmscore/authentication.\n8. if the app opens and the problem is video, investigates playback/spoof video streams and only then network/battery.\n9. if the problem persists, export logs before wiping data or reinstalling everything.[r4][r7]indicator phase first hypothesis\n\n\nload patches error \"patch... does not exist\" / source selection, dependency, source or api of\nunavailable patches\n\npatching error during transformation/compilation incompatible version, patch option,\nmemory, bundle\n\nsigning ends build but update fails keystore/certificate different\n\ninstall \"app not installed\" / downgrade signature, package, versioncode, profile\n\nruntime crash on patch/configuration/app/os\n\nauth does not enter the gmscore account, version, account/network\n\nplayback buffer, 403, pause ~1.00 spoof video streams/client, patches\noutdated"
    },
    {
      "id": 2,
      "title": "ReVanced mental architecture",
      "text": "ReVanced Manager is the interface; Patcher applies transformations; the resulting APK is signed and\nThen installed. Separate these components prevents wrong diagnoses.\n\nComponent Function When to suspect\n\n\nReVanced Manager UI, sources, downloader, selection, signing, Manager crash, patches do not load,\nimport/export installation\n\nReVanced Patcher applies patches to APK exception during patching, incompatibilities\n\nReVanced Patches modification rules per app/version feature missing, patch incompatible, playback\n\nBase binary APK to modify bundle/split, wrong version, tampered APK\n\nKeystore signs APK patched update rejected by different subscription\n\nGmsCore compatibility Google in non-root login, account, notifications/integration scenarios\nwho use GmsCore support\n\nAndroid installation, package manager, battery, network, App not installed, background, PiP, vendor\nrestrictions permissions\n\n\nCRITICAL POINT\nThe same final symptom may originate in different phases. \"YouTube does not work\" is insufficient information; \"patch\nfinished, APK installed, app opens, video stops at 0.55\" already locates the playback failure.",
      "search": "revanced mental architecture\nrevanced manager is the interface; patcher applies transformations; the resulting apk is signed and\nthen installed. separate these components prevents wrong diagnoses.\n\ncomponent function when to suspect\n\n\nrevanced manager ui, fonts, downloader, selection, signing, manager crash, patches do not load,\nimport/export installation\n\nrevanced patcher applies patches to apk exception during patching, incompatibilities\n\nrevanced patches modification rules per app/version feature missing, patch incompatible, playback\n\nbase binary apk to modify bundle/split, wrong version, tampered apk\n\nkeystore signs apk patched update rejected by different subscription\n\ngmscore compatibility google in non-root login, account, notifications/integration scenarios\nwho use gmscore support\n\nandroid installation, package manager, battery, network, app not installed, background, pip, vendor\nrestrictions permissions\n\n\ncritical point\nthe same final symptom may originate in different phases. \"youtube does not work\" is insufficient information; \"patch\nfinished, apk installed, app opens, video stops at 0.55\" already locates the playback failure."
    },
    {
      "id": 3,
      "title": "Security and chain of trust",
      "text": "The biggest risk is not the patch itself; it is to lose traceability of Manager origin, patches, APK\nBase, GmsCore and signature.\n\n3.1 Official sources\n• Manager: revanced.app/download or releases from the official repository.[R1][R12]• Documentation: ReVanced official repositories and announcements on revanced.app.[R6][R10]• GmsCore: When the GmsCore support patch is present, the application can redirect to the appropriate download.\n[R7]• External patches: Manager v2 allows multiple sources, but this does not transform third party patches into official support.\n[R8]DO NOT DO\nDo not disable Play Protect, version check, 2FA or other protections as first attempt. If an action\nreduce safety, must be temporary, justified and reversed.\n\n\n3.2 Keystore and updates\nAndroid requires consistency of application ID, signature, and versionCode for a normal update. A build\nsigned with a different key can be refused even if the package is identical. Manager allows\nimport/export the signing keystore; store it securely.[R4][R13]Backup recommended\nExport keystore and important settings before migrating from device, clearing data from Manager or\ntry a new installation. Losing the key may require uninstalling the patched app to install a build\nsigned with another key.",
      "search": "security and chain of trust\nthe biggest risk is not the patch itself; it is to lose traceability of manager origin, patches, apk\nbase, gmscore and signature.\n\n3.1 official sources\n• manager: revanced.app/download or releases from the official repository.[r1][r12]• documentation: revanced official repositories and announcements on revanced.app.[r6][r10]• gmscore: when the gmscore support patch is present, the application can redirect to the appropriate download.\n[r7]• external patches: manager v2 allows multiple sources, but this does not transform third party patches into official support.\n[r8]do not do\ndo not disable play protect, version check, 2fa or other protections as first attempt. if an action\nreduce safety, must be temporary, justified and reversed.\n\n\n3.2 keystore and updates\nandroid requires consistency of application id, signature, and versioncode for a normal update. a build\nsigned with a different key can be refused even if the package is identical. manager allows\nimport/export the signing keystore; store it securely.[r4][r13]backup recommended\nexport keystore and important settings before migrating from device, clearing data from manager or\ntry a new installation. losing the key may require uninstalling the patched app to install a build\nsigned with another key."
    },
    {
      "id": 4,
      "title": "Clean Installation of ReVanced Manager",
      "text": "Safe procedure to start from a known state.\n1. Confirms Android 8.0 or higher.[R2]2. Gets Manager only on the official channel.[R1]3. Install the APK Manager.\n4. Opens Settings > Updates and keeps the channel stable for daily use, unless explicitly needed for pre-release. O\nManager automatically checks updates by default.[R9]5. In Settings > Advanced, it keeps the safeguards in the default values.\n6. Do not add external patch sources during the base installation.\n7. Only then test the first patch with defaults.\n\nPRE-RELEASE\nA pre-release may contain new corrections but also regressions. Official releases page showed builds\n2.7.0-dev.* in July 2026; for normal use, follows the official stable channel presented by Manager/site, instead of\nmanually fix a dev build.[R12]",
      "search": "clean installation of revanced manager\nsafe procedure to start from a known state.\n1. confirms android 8.0 or higher.[r2]2. gets manager only on the official channel.[r1]3. install the apk manager.\n4. opens settings > updates and keeps the channel stable for daily use, unless explicitly needed for pre-release. o\nmanager automatically checks updates by default.[r9]5. in settings > advanced, it keeps the safeguards in the default values.\n6. do not add external patch sources during the base installation.\n7. only then test the first patch with defaults.\n\npre-release\na pre-release may contain new corrections but also regressions. official releases page showed builds\n2.7.0-dev.* in july 2026; for normal use, follows the official stable channel presented by manager/site, instead of\nmanually fix a dev build.[r12]"
    },
    {
      "id": 5,
      "title": "APK, split APK, APKM, XAPK and suggested version",
      "text": "Many patching errors start before the patcher: input is not the file you think\nIt is.\n\n5.1 Full APK vs bundles\nManager documentation recommends a full APK and bundles list as a common cause of failure. On modern Android, the\nPlay Store can install multiple APK splits that work as a single app. A .apkm/.xapk/.apks file is a\ncontainer/assembly, not the same as a complete patchable APK.[R5][R14]Format Practical interpretation Use in diagnosis\n\n.apk installable file; can be full APK or prefer full APK compatible\na split part\n\n.apkm / .xapk container of multiple APKs/resources do not treat as full direct APK\n\n.apks APK set generated by bundletool split set; not a single APK\n\n.aab publication format is not installable directly on Android\n\n\n5.2 Suggested version\nBy default, Manager can impose the suggested version based on the selected patches. Disable that safeguard\nallows versions not explicitly compatible, but the documentation warns that patches may fail or be omitted.\n[R4]PROCEDURE\nWhen you're fixing an error, don't match \"APK not suggested\" with \"customized patches.\" Return first to\nsuggested version + default selection. Then he introduces one change at a time.",
      "search": "apk, split apk, apkm, xapk and suggested version\nmany patching errors start before the patcher: input is not the file you think\nit is.\n\n5.1 full apk vs bundles\nmanager documentation recommends a full apk and bundles list as a common cause of failure. on modern android, the\nplay store can install multiple apk splits that work as a single app. a .apkm/.xapk/.apks file is a\ncontainer/assembly, not the same as a complete patchable apk.[r5][r14]format practical interpretation use in diagnosis\n\n.apk installable file; can be full apk or prefer full apk compatible\na split part\n\n.apkm / .xapk container of multiple apks/resources do not treat as full direct apk\n\n.apks apk set generated by bundletool split set; not a single apk\n\n.aab publication format is not installable directly on android\n\n\n5.2 suggested version\nby default, manager can impose the suggested version based on the selected patches. disable that safeguard\nallows versions not explicitly compatible, but the documentation warns that patches may fail or be omitted.\n[r4]programme\nwhen you're fixing an error, don't match \"apk not suggested\" with \"customized patches.\" return first to\nsuggested version + default selection. then he introduces one change at a time."
    },
    {
      "id": 6,
      "title": "Canon patching flow",
      "text": "The official flow is short. The value of this chapter is in the checkpoints between steps.\n1. Apps > select the application or select from storage.[R3]2. Confirms APK version and source.\n3. Maintain default patches; the Manager manual itself recommends Reset/default.[R3]4. If necessary, choose known downloader/source.[R3]5. Start Patch.\n6. Read the first relevant exception; do not stick to the last generic lines of coroutines.\n7. At the end, install or export the APK with the save button.[R3]8. After installation, validate boot, login and main function before customizing dozens of options.\n\nCHECKPOINT\nSaves the APK patched that passed the test along with APK version base, date, Manager version and selection\nPatches. This creates a rollback baseline.",
      "search": "canon patching flow\nthe official flow is short. the value of this chapter is in the checkpoints between steps.\n1. apps > select the application or select from storage.[r3]2. confirms apk version and source.\n3. maintain default patches; the manager manual itself recommends reset/default.[r3]4. if necessary, choose known downloader/source.[r3]5. start patch.\n6. read the first relevant exception; do not stick to the last generic lines of coroutines.\n7. at the end, install or export the apk with the save button.[r3]8. after installation, validate boot, login and main function before customizing dozens of options.\n\ncheckpoint\nsaves the apk patched that passed the test along with apk version base, date, manager version and selection\npatches. this creates a rollback baseline."
    },
    {
      "id": 7,
      "title": "Safeguards, patch sources and downloaders",
      "text": "Manager v2 gives you more flexibility. In troubleshooting, uncontrolled flexibility increases the\nfailure space.\n\n7.1 Settings > Advanced\nDefault Troubleshooting Option\n\nDisable version compatibility check keep disabled; do not force incompatible versions\n\nRequire suggested app version keep active\n\nAllow changing patch selection and options to use only when needed; return to defaults to isolate faults\n\nAllow using universal patches keep disabled unless justified\n\nRun patcher in another process use only for OOM/performance as documentation\n\n\nOfficial documentation explicitly warns that change compatibility, suggested version, selection and universal patches\nIt can produce unexpected problems.[R4]7.2 Patch sources\nManager allows you to add patches per URL or storage; the remote/local file must use the ReVanced API format.\nIf a source does not load, it confirms URL, connectivity and format.[R8][R5]ISOLATION METHOD\nIf you use multiple fonts and a patch error does not exist/dependence appears, temporarily disables external sources,\nKeeps only the officer and uses Reset in the selection.",
      "search": "safeguards, patch sources and downloaders\nmanager v2 gives you more flexibility. in troubleshooting, uncontrolled flexibility increases the\nfailure space.\n\n7.1 settings > advanced\ndefault troubleshooting option\n\ndisable version compatibility check keep disabled; do not force incompatible versions\n\nrequire suggested app version keep active\n\nallow changing patch selection and options to use only when needed; return to defaults to isolate faults\n\nallow using universal patches keep disabled unless justified\n\nrun patcher in another process use only for oom/performance as documentation\n\n\nofficial documentation explicitly warns that change compatibility, suggested version, selection and universal patches\nit can produce unexpected problems.[r4]7.2 patch sources\nmanager allows you to add patches per url or storage; the remote/local file must use the revanced api format.\nif a source does not load, it confirms url, connectivity and format.[r8][r5]isolation method\nif you use multiple fonts and a patch error does not exist/dependence appears, temporarily disables external sources,\nkeeps only the officer and uses reset in the selection."
    },
    {
      "id": 8,
      "title": "Compatibility and patch options",
      "text": "Two types of change often cause regressions: choose an APK outside the\ncompatibility and change options without realizing dependencies.\n\n8.1 Reset before debug\nManager documentation recommends default patch set and troubleshooting documentation asks reset\nof patch options when there is failure/crash.[R3][R5]8.2 Implicit dependencies\nSome patches may depend on others. If an expected patch is removed from the selection, the patcher may fail\nlook for a dependency by name. An official issue of 2026 documented a case in which to disable a patch\ndependent made the patcher fail; the first safe action is reset defaults.[R15]DO NOT INTERPRET MAL\n\"Patch X does not exist\" does not automatically mean that APK is corrupted. The error is resolution of\npatches/dependencies until proven otherwise.",
      "search": "compatibility and patch options\ntwo types of change often cause regressions: choose an apk outside the\ncompatibility and change options without realizing dependencies.\n\n8.1 reset before debug\nmanager documentation recommends default patch set and troubleshooting documentation asks reset\nof patch options when there is failure/crash.[r3][r5]8.2 implicit dependencies\nsome patches may depend on others. if an expected patch is removed from the selection, the patcher may fail\nlook for a dependency by name. an official issue of 2026 documented a case in which to disable a patch\ndependent made the patcher fail; the first safe action is reset defaults.[r15]do not interpret mal\n\"patch x does not exist\" does not automatically mean that apk is corrupted. the error is resolution of\npatches/dependencies until proven otherwise."
    },
    {
      "id": 9,
      "title": "Error \"Patch with name ... does not exist\" and Custom branding",
      "text": "This is a patch load/resolution error. The focus is selection and fonts, not GmsCore or\nPlayback.\n\n\nReal case: The patcher failed to load patches with \"Patch with name Custom branding does not exist\".\n\nProcedure\n1. No reinstalles GmsCore: failure occurs before runtime.\n2. Patches > Reset/default.\n3. It confirms that Custom branding is present if the feature/configuration in question depends on it.\n4. It temporarily removes external patch sources.\n5. Update Manager/Paches via official channel and repatcha.\n6. If failure persists with defaults, export Manager logs and attach version, app, APK and patch selection to bug report.\n\nRIGHT READING OF STACK TRACE\nThe final lines of kotlinx. coroutines only show where the exception has spread. The useful message is at the top: \"Patch\nwith name Custom branding does not exist\".",
      "search": "error \"patch with name ... does not exist\" and custom branding\nthis is a patch load/resolution error. the focus is selection and fonts, not gmscore or\nplayback.\n\n\nreal case: the patcher failed to load patches with \"patch with name custom branding does not exist\".\n\nprocedure\n1. no reinstalles gmscore: failure occurs before runtime.\n2. patches > reset/default.\n3. it confirms that custom branding is present if the feature/configuration in question depends on it.\n4. it temporarily removes external patch sources.\n5. update manager/paches via official channel and repatcha.\n6. if failure persists with defaults, export manager logs and attach version, app, apk and patch selection to bug report.\n\nright reading of stack trace\nthe final lines of kotlinx. coroutines only show where the exception has spread. the useful message is at the top: \"patch\nwith name custom branding does not exist\"."
    },
    {
      "id": 10,
      "title": "Out Of Memory, slow patching and build failures",
      "text": "Patching is intensive in memory and storage. The first objective is to distinguish insufficiency from\nlogical incompatibility capabilities.\n\n10.1 OOM\n1. Closes heavy apps and confirms enough free space.\n2. Restarts Manager and repeats with APK/default patches.\n3. If the log indicates Out Of Memory, the documentation suggests activating \"Experimental: Run patcher in another process\".[R5][R4]4. Do not use the experimental option preventively if normal patching works.\n\n10.2 Resource Failure/AAAPT\nIf the exception mentions resource compilation, Androlib, aapt or manifest, it returns to the suggested version and defaults. An error of\nfeatures is not usually fixed by changing the Spoof video streams client, because this adjustment is runtime.\n\nMINIMUM EVIDENCE\nSave the first exception, Manager version, app/version, Android, architecture and patches. \"You made a mistake\" isn't\nsufficient for a technical reproduction.",
      "search": "out of memory, slow patching and build failures\npatching is intensive in memory and storage. the first objective is to distinguish insufficiency from\nlogical incompatibility capabilities.\n\n10.1 oom\n1. closes heavy apps and confirms enough free space.\n2. restarts manager and repeats with apk/default patches.\n3. if the log indicates out of memory, the documentation suggests activating \"experimental: run patcher in another process\".[r5][r4]4. do not use the experimental option preventively if normal patching works.\n\n10.2 resource failure/aaapt\nif the exception mentions resource compilation, androlib, aapt or manifest, it returns to the suggested version and defaults. an error of\nfeatures is not usually fixed by changing the spoof video streams client, because this adjustment is runtime.\n\nminimum evidence\nsave the first exception, manager version, app/version, android, architecture and patches. \"you made a mistake\" isn't\nsufficient for a technical reproduction."
    },
    {
      "id": 11,
      "title": "Manager closes, blocks or does not end downloads",
      "text": "Separating patched app failure manager is essential.\n1. Confirms official origin and minimum Android.\n2. Update Manager on official channel.\n3. Reset Settings > Advanced for defaults.[R5]4. If the problem is downloader, try selecting a known APK full or other downloader configured in your own\nManager, no mixing third party patches.\n5. If Manager closes, export debug logs if you can get into Settings > Advanced.[R4]6. Only after collecting logs consider cleaning data/reinstall.\n\nDO NOT CONFUND\nA download that does not end does not show that the patches are broken. First validate the acquisition layer\nAPK.",
      "search": "manager closes, blocks or does not end downloads\nseparating patched app failure manager is essential.\n1. confirms official origin and minimum android.\n2. update manager on official channel.\n3. reset settings > advanced for defaults.[r5]4. if the problem is downloader, try selecting a known apk full or other downloader configured in your own\nmanager, no mixing third party patches.\n5. if manager closes, export debug logs if you can get into settings > advanced.[r4]6. only after collecting logs consider cleaning data/reinstall.\n\ndo not confund\na download that does not end does not show that the patches are broken. first validate the acquisition layer\napk."
    },
    {
      "id": 12,
      "title": "\"App not installed\": signature, package, downgrade and profiles",
      "text": "After the patch is finished, Android Package Manager becomes a central part of the diagnosis.\n\n12.1 Android update rules\nFor a normal update, Android requires the same application ID, compatible signature certificate and\nproper versionCode. If one of these conditions fails, the update may be refused.[R13]Symptoms Probable Cause Safe test\n\n\nApp not installed different signature / package conflict compare certs; check installed app and\npackage\n\nUpdate incompatible keystore different use the same keystore or uninstall only\nif you accept to lose local data\n\nLower versionCode below use compatible/suggested version; do not force\ndowngrade for no reason\n\nInvisible conflict work profile / second space / user check all profiles/instances\nsecondary\n\n\n12.2 Check certificate with Android SDK\napksigner verify --print-certs app-patched. apk\n\nThe apksigner is the official Android tool for checking APK signatures.[R16]KEYSTORE\nIf a functional build is already installed, export and preserve the signing keystore before wiping Manager data.\nChanging keystore changes build's cryptographic identity.",
      "search": "\"app not installed\": signature, package, downgrade and profiles\nafter the patch is finished, android package manager becomes a central part of the diagnosis.\n\n12.1 android update rules\nfor a normal update, android requires the same application id, compatible signature certificate and\nproper versioncode. if one of these conditions fails, the update may be refused.[r13]symptoms probable cause safe test\n\n\napp not installed different signature / package conflict compare certs; check installed app and\npackage\n\nupdate incompatible keystore different use the same keystore or uninstall only\nif you accept to lose local data\n\nlower versioncode below use compatible/suggested version; do not force\ndowngrade for no reason\n\ninvisible conflict work profile / second space / user check all profiles/instances\nsecondary\n\n\n12.2 check certificate with android sdk\napksigner verify --print-certs app-patched. apk\n\nthe apksigner is the official android tool for checking apk signatures.[r16]keystore\nif a functional build is already installed, export and preserve the signing keystore before wiping manager data.\nchanging keystore changes build's cryptographic identity."
    },
    {
      "id": 13,
      "title": "Root vs non-root: Choose a model and keep it",
      "text": "Mixing root and non-root instructions is a recurring source of confusion.\n\nTheme Non-root Root\n\n\nAPK installation patched as normal/altered app can involve app assembly/replacement\nas stock patches as support\n\nGoogle services GmsCore support is common in can use services Native Google\nYouTube/YouTube Music depending on the method\n\nOperational risk low systemic impact greater impact; SELinux/mount/modules\nmay interfere\n\nRollback Uninstall/reinstall compatible build may require dismount/remove module and\nrestore stock\n\n\nPROCEDURE\nIf you do not have root, do not follow solutions based on Magisk/KSU/APatch. If you have root, document the method and any\nmodule that changes package mounting before opening a bug report.",
      "search": "root vs non-root: choose a model and keep it\nmixing root and non-root instructions is a recurring source of confusion.\n\ntheme non-root root\n\n\napk installation patched as normal/altered app can involve app assembly/replacement\nas stock patches as support\n\ngoogle services gmscore support is common in can use services native google\nyoutube/youtube music depending on the method\n\noperational risk low systemic impact greater impact; selinux/mount/modules\nmay interfere\n\nrollback uninstall/reinstall compatible build may require dismount/remove module and\nrestore stock\n\n\nprogramme\nif you do not have root, do not follow solutions based on magisk/ksu/apatch. if you have root, document the method and any\nmodule that changes package mounting before opening a bug report."
    },
    {
      "id": 14,
      "title": "GmsCore, login and Google account",
      "text": "GmsCore is a separate layer of reproduction. Correct authentication before investigating codecs\nor Spoof client.\n\n14.1 Basic procedure\n1. Confirms that the app has been patched with GmsCore support when applicable.\n2. Use the current version of GmsCore indicated by the official stream; ReVanced announced in February 2026 a\nspecific update for login problems.[R11]3. If GmsCore already works, do not update it/clean it without need.\n4. If login fails after Google changes, repatch with current patches and confirm the current GmsCore.[R11]5. Test without VPN/DNS filter if the error is connectivity during login.\n\n14.2 Symptoms that don't point first to GmsCore\n• Patch does not load in Manager.\n• Signature error on installation.\n• Video plays 55 seconds and then buffers with already authenticated account.\n\nPRIVACITY\nGmsCore is no reason to enter credentials on a random page. Always confirm that you are in the stream\nexpected application/GmsCore installed from the given origin.",
      "search": "gmscore, login and google account\ngmscore is a separate layer of reproduction. correct authentication before investigating codecs\nor spoof client.\n\n14.1 basic procedure\n1. confirms that the app has been patched with gmscore support when applicable.\n2. use the current version of gmscore indicated by the official stream; revanced announced in february 2026 a\nspecific update for login problems.[r11]3. if gmscore already works, do not update it/clean it without need.\n4. if login fails after google changes, repatch with current patches and confirm the current gmscore.[r11]5. test without vpn/dns filter if the error is connectivity during login.\n\n14.2 symptoms that don't point first to gmscore\n• patch does not load in manager.\n• signature error on installation.\n• video plays 55 seconds and then buffers with already authenticated account.\n\nprivacity\ngmscore is no reason to enter credentials on a random page. always confirm that you are in the stream\nexpected application/gmscore installed from the given origin."
    },
    {
      "id": 15,
      "title": "YouTube opens and closes, black screen or crash on startup",
      "text": "Here the APK has already been installed; the investigation passes to runtime.\n1. Force the app to stop and open again.\n2. Confirms that crash started immediately after repatch/update.\n3. Reset options ReVanced recently changed.\n4. If you changed many patches, create a control build with defaults and suggested version.\n5. Confirms GmsCore only if the log/authentication points to this layer.\n6. Activate debug logging when available and capture AndroidRuntime/returned logs.[R7]PIP\nOfficial documentation refers to a case where videos are instantly paused when clicking Play and\nrecommends to disable Picture in Picture due to an OS/YouTube problem.[R6]",
      "search": "youtube opens and closes, black screen or crash on startup\nhere the apk has already been installed; the investigation passes to runtime.\n1. force the app to stop and open again.\n2. confirms that crash started immediately after repatch/update.\n3. reset options revanced recently changed.\n4. if you changed many patches, create a control build with defaults and suggested version.\n5. confirms gmscore only if the log/authentication points to this layer.\n6. activate debug logging when available and capture androidruntime/returned logs.[r7]pip\nofficial documentation refers to a case where videos are instantly paused when clicking play and\nrecommends to disable picture in picture due to an os/youtube problem.[r6]"
    },
    {
      "id": 16,
      "title": "Playback: buffering, pause, 403, video unavailable",
      "text": "Since 2026, YouTube changes have required updates in Spoof video streams; maintain patches\ncurrent is part of the official diagnosis.\n\n16.1 Test order\n1. Confirm current patches. ReVanced published in June 2026 a playback correction on Spoof video streams\nfor YouTube and YouTube Music.[R10]2. Confirms Spoof video streams is present/active on the build where it is needed.\n3. Test the same video on a different network to separate server/route from local configuration.\n4. If you load slowly or buffer indefinitely, documentation recommends testing other clients on ReVanced\nSettings > Miscellaneous > Spoof video streams > Default Client.[R6]5. Change one customer at a time and fully restart YouTube between tests.\n6. Use Stats for nerds to confirm the client/codec when available.\n\nNEVER CONCLUIR EAST\nIf switching from Wi-Fi to mobile data does not change the exact point of failure, the network hypothesis loses power. If it fails\nmoves with the spoof client, the configuration hypothesis gains strength.",
      "search": "playback: buffering, pause, 403, video unavailable\nsince 2026, youtube changes have required updates in spoof video streams; maintain patches\ncurrent is part of the official diagnosis.\n\n16.1 test order\n1. confirm current patches. revanced published in june 2026 a playback correction on spoof video streams\nfor youtube and youtube music.[r10]2. confirms spoof video streams is present/active on the build where it is needed.\n3. test the same video on a different network to separate server/route from local configuration.\n4. if you load slowly or buffer indefinitely, documentation recommends testing other clients on revanced\nsettings > miscellaneous > spoof video streams > default client.[r6]5. change one customer at a time and fully restart youtube between tests.\n6. use stats for nerds to confirm the client/codec when available.\n\nnever concluir east\nif switching from wi-fi to mobile data does not change the exact point of failure, the network hypothesis loses power. if it fails\nmoves with the spoof client, the configuration hypothesis gains strength."
    },
    {
      "id": 17,
      "title": "Spoof video streams: customers and side effects",
      "text": "Available names and options change between patch versions. Use your build menu as\nsource of truth.\n\n\nConfiguration input: ReVanced > Miscellaneous > Fake video streams.\n\n\nThe very tested build warned: the current customer could make the video stop at ~1:00.\n\n17.1 How to Test Customers\n1. Write down the current client.\n2. Select an alternative client available in the build itself.\n3. Close YouTube completely and reopen.\n4. Plays the same video for at least 2-3 minutes.\n5. Registers: failure time, duration, quality, codec, resumes alone.\n6. If it gets worse, go back to baseline and test the next client.\n\n\nExample of customers available in the tested build: Android Reel, Android Reel (no auth), Android Studio, Android VR and visionOS.\n\nIMPORTANT\nThere is no guaranteed universal order among these clients. Official documentation says to test clients\nalternative when there is buffering; the optimal choice depends on the version, server, region and device.[R6]",
      "search": "spoof video streams: customers and side effects\navailable names and options change between patch versions. use your build menu as\nsource of truth.\n\n\nconfiguration input: revanced > miscellaneous > fake video streams.\n\n\nthe very tested build warned: the current customer could make the video stop at ~1:00.\n\n17.1 how to test clients\n1. write down the current client.\n2. select an alternative client available in the build itself.\n3. close youtube completely and reopen.\n4. plays the same video for at least 2-3 minutes.\n5. registers: failure time, duration, quality, codec, resumes alone.\n6. if it gets worse, go back to baseline and test the next client.\n\n\nexample of customers available in the tested build: android reel, android reel (no auth), android studio, android vr and visionos.\n\nimportant\nthere is no guaranteed universal order among these clients. official documentation says to test clients\nalternative when there is buffering; the optimal choice depends on the version, server, region and device.[r6]"
    },
    {
      "id": 18,
      "title": "Validated case: video stopped at 0:55-1:00",
      "text": "This real case is useful because it shows how a temporally stable symptom reduces the space of\nresearch.\n\nObservation Field\n\nNormal YouTube symptoms: music/video played and stopped around\n0:55; then resumed.\n\nFunctional ReVanced Installation; problem only during playback.\n\nStarter Android Reel (no auth).\n\nVisual initiation Spoof's own page indicated that the video could stop at\n1:00.\n\nSingle Change Default Client → visionOS.\n\nValidation The same content has exceeded the failure point without interruption;\nproblem considered solved in the tested device.\n\n\nVALIDATED CASE\nvisionOS solved this device/build. The generalizable conclusion is not \"vision is always better\"; it is \"when the\nfailure is in the first minute, tests Spoof clients in a controlled and valid way in the same video\".\n\n\n18.1. Approval criteria\n• Even video passes 3 minutes without abnormal pause.\n• Another video also plays without failure.\n• Quality and audio remain acceptable.\n• Reopening the application does not return the problem.",
      "search": "validated case: video stopped at 0:55-1:00\nthis real case is useful because it shows how a temporally stable symptom reduces the space of\nresearch.\n\nobservation field\n\nnormal youtube symptoms: music/video played and stopped around\n0:55; then resumed.\n\nfunctional revanced installation; problem only during playback.\n\nstarter android reel (no auth).\n\nvisual initiation spoof's own page indicated that the video could stop at\n1:00.\n\nsingle change default client -> visionos.\n\nvalidation the same content has exceeded the failure point without interruption;\nproblem considered solved in the tested device.\n\n\ncase validated\nvisionos solved this device/build. the generalizable conclusion is not \"vision is always better\"; it is \"when the\nfailure is in the first minute, tests spoof customers in a controlled and valid way in the same video\".\n\n\n18.1. approval criteria\n• even video passes 3 minutes without abnormal pause.\n• another video also plays without failure.\n• quality and audio remain acceptable.\n• reopening the application does not return the problem."
    },
    {
      "id": 19,
      "title": "Audio, codecs, quality and \"Stats for nerds\"",
      "text": "Not every playback problem is a lack of bandwidth.\n\n19.1 Symptoms\nHypothesis Symptoms\n\nAudio without video codec/decoder, stream client, app/OS, acceleration\n\nVideo without audio track/codec, volume/route Bluetooth, patch/YouTube\n\nQuality prey low customer spoil, capacity/route, server response\n\nQuality selector missing client effect/patch/YouTube; confirm with current patch and other\nclient\n\nSpeed/playback speed absent patch/client regression; repatching with current patches\n\n\n19.2 Stats for nerds\nUse it as an observation tool: client type (when patch exposes it), codec, resolution, buffer and network activity.\nDo not change options just because a codec \"seems strange\"; seeks correlation with failure.",
      "search": "audio, codecs, quality and \"stats for nerds\"\nnot every playback problem is a lack of bandwidth.\n\n19.1 symptoms\nhypothesis symptoms\n\naudio without video codec/decoder, stream client, app/os, acceleration\n\nvideo without audio track/codec, volume/route bluetooth, patch/youtube\n\nquality prey low customer spoil, capacity/route, server response\n\nquality selector missing client effect/patch/youtube; confirm with current patch and other\nclient\n\nspeed/playback speed absent patch/client regression; repatching with current patches\n\n\n19.2 stats for nerds\nuse it as an observation tool: client type (when patch exposes it), codec, resolution, buffer and network activity.\ndo not change options just because a codec \"seems strange\"; seeks correlation with failure."
    },
    {
      "id": 20,
      "title": "Background, PiP and behaviour with off screen",
      "text": "If the video works in foreground but stops in background, the diagnostic axis changes to\nAndroid/battery/PiP.\n\nCondition Test\n\nTo block screen check battery optimization/background restrictions for YouTube\nand GmsCore\n\nInstant pause when Play test PiP off as official troubleshooting[R6]Bluetooth changes behavior test local audio/speaker and disable aggressive controls of\nseller\n\nOnly battery economy failure temporarily disable economy mode to confirm cause\n\n\nMANUFACTURERS\nMenu names vary by Samsung, Xiaomi, OPPO/OnePlus, Huawei, etc. The goal is to allow execution on\nbackground without turning the app into a limitless service. Revert exceptions that prove unnecessary.",
      "search": "background, pip and behaviour with off screen\nif the video works in foreground but stops in background, the diagnostic axis changes to\nandroid/battery/pip.\n\ncondition test\n\nto block screen check battery optimization/background restrictions for youtube\nand gmscore\n\ninstant pause when play test pip off as official troubleshooting[r6]bluetooth changes behavior test local audio/speaker and disable aggressive controls of\nseller\n\nonly battery economy failure temporarily disable economy mode to confirm cause\n\n\nmanufacturers\nmenu names vary by samsung, xiaomi, oppo/oneplus, huawei, etc. the goal is to allow execution on\nbackground without turning the app into a limitless service. revert exceptions that prove unnecessary."
    },
    {
      "id": 21,
      "title": "History, links, Shorts, SponsorBlock and features that \"disappear\"",
      "text": "When a feature disappears after repatch, you do not assume as soon as the patch has been removed from\nproject.\n\nChecklist\n1. Confirms if the matching patch was actually included.\n2. Confirms that the internal option ReVanced was disabled after migration/reset.\n3. Checks if the problem also occurs with default selection.\n4. Repatch with current patches when function depends on server/YouTube behavior.\n5. If the problem is just an icon/log, the documentation indicates that the Custom branding patch needs to be included and\nApp icon option may need activation.[R6]STATE VS PATCH\nA feature may be patched but disabled in the settings. Distinguish \"not applied patch\" from \"applied feature\"\nbut configuration off\".",
      "search": "history, links, shorts, sponsorblock and features that \"disappear\"\nwhen a feature disappears after repatch, you do not assume as soon as the patch has been removed from\nproject.\n\nchecklist\n1. confirms if the matching patch was actually included.\n2. confirms that the internal option revanced was disabled after migration/reset.\n3. checks if the problem also occurs with default selection.\n4. repatch with current patches when function depends on server/youtube behavior.\n5. if the problem is just an icon/log, the documentation indicates that the custom branding patch needs to be included and\napp icon option may need activation.[r6]state vs patch\na feature may be patched but disabled in the settings. distinguish \"not applied patch\" from \"applied feature\"\nbut configuration off\"."
    },
    {
      "id": 22,
      "title": "YouTube Music",
      "text": "The troubleshooting logic is similar to YouTube, but treats the symptoms separately for\navoid applying specific solutions of the wrong player.\n1. Confirm app/version and current patches.\n2. If non-root confirms GmsCore support/GmsCore when applicable.\n3. For playback, use build specific troubleshooting; Spoof video streams fixes published by\nReVanced in 2026 covered YouTube and YouTube Music.[R10]4. You don't assume that a YouTube Music bug is automatically the same as normal YouTube.\n5. Plays at least two tracks and records the exact point of the failure.",
      "search": "youtube music\nthe troubleshooting logic is similar to youtube, but treats the symptoms separately for\navoid applying specific solutions of the wrong player.\n1. confirm app/version and current patches.\n2. if non-root confirms gmscore support/gmscore when applicable.\n3. for playback, use build specific troubleshooting; spoof video streams fixes published by\nrevanced in 2026 covered youtube and youtube music.[r10]4. you don't assume that a youtube music bug is automatically the same as normal youtube.\n5. plays at least two tracks and records the exact point of the failure."
    },
    {
      "id": 23,
      "title": "Network, private DNS, VPN, ad blockers and filtering",
      "text": "The network is a hypothesis, not a universal excuse. It tests binaryly.\n\nTest A/B Interpretation\n\nWi-Fi -> mobile data changes the symptom, investigate network/ISP/DNS/VPN\n\nVPN on -> off corrects, tunnel route/VPN/DNS is relevant\n\nPrivate DNS custom -> auto correct, required domain may be filtered\n\nLocal Pi-hole/AdGuard -> bypass correct, review blocked lists/rule\n\nSame point ~0:55 on all network loses power; spoof/runtime client gains strength\n\n\nSECURITY\nDon't let it DNS/VPN permanently disabled just to make it work. Use the test to locate the\nrule/domain or incompatibility and then restores the safety posture.",
      "search": "network, private dns, vpn, ad blockers and filtering\nthe network is a hypothesis, not a universal excuse. it tests binaryly.\n\ntest a/b interpretation\n\nwi-fi -> mobile data changes the symptom, investigate network/isp/dns/vpn\n\nvpn on -> off corrects, tunnel route/vpn/dns is relevant\n\nprivate dns custom -> auto correct, required domain may be filtered\n\nlocal pi-hole/adguard -> bypass correct, review blocked lists/rule\n\nsame point ~0:55 on all network loses power; spoof/runtime client gains strength\n\n\nsecurity\ndon't let it dns/vpn permanently disabled just to make it work. use the test to locate the\nrule/domain or incompatibility and then restores the safety posture."
    },
    {
      "id": 24,
      "title": "Battery, background and manufacturer restrictions",
      "text": "Continuous playback problems can be caused by the system to suspend YouTube or\nGmsCore.\n1. Test with the app in foreground and on screen.\n2. Then block the screen; if it only fails in background, check battery optimization.\n3. It confirms that GmsCore is not in excessively restricted mode when it depends on background.\n4. Avoid putting everything in \"Unrestricted\" without testing; apply the minimum exception required.\n5. After change, it repeats the same scenario and measures whether the behavior has changed.",
      "search": "battery, background and manufacturer restrictions\ncontinuous playback problems can be caused by the system to suspend youtube or\ngmscore.\n1. test with the app in foreground and on screen.\n2. then block the screen; if it only fails in background, check battery optimization.\n3. it confirms that gmscore is not in excessively restricted mode when it depends on background.\n4. avoid putting everything in \"unrestricted\" without testing; apply the minimum exception required.\n5. after change, it repeats the same scenario and measures whether the behavior has changed."
    },
    {
      "id": 25,
      "title": "Secure update and rollback",
      "text": "A functionally correct update can introduce regressions for YouTube changes,\npatches, manager or gmscore.\n\n25.1 Before updating\n• Export keystore and, if necessary, patch selections/options.[R4]• Saves the APK patched functional and annotates version of the APK base.\n• Read official ads if there is a recent global failure.[R10][R11]25.2 After updating\n1. Valid starter.\n2. Validate login.\n3. Valida playback >3 min.\n4. Validate background/PiP if you use those functions.\n5. Only then eliminates the previous baseline.\n\nROLLBACK\nSecure Rollback depends on signature/package/versionCode. Don't push downgrade blind. If you need it\nUninstall, previously consider local data and the possibility of re-signing with the same keystore.",
      "search": "secure update and rollback\na functionally correct update can introduce regressions for youtube changes,\npatches, manager or gmscore.\n\n25.1 before updating\n• export keystore and, if necessary, patch selections/options.[r4]• saves the apk patched functional and annotates version of the apk base.\n• read official ads if there is a recent global failure.[r10][r11]25.2 after updating\n1. valid starter.\n2. validate login.\n3. valida playback >3 min.\n4. validate background/pip if you use those functions.\n5. only then eliminates the previous baseline.\n\nrollback\nsecure rollback depends on signature/package/versioncode. don't push downgrade blind. if you need it\nuninstall, previously consider local data and the possibility of re-signing with the same keystore."
    },
    {
      "id": 26,
      "title": "Total Recovery Runbook",
      "text": "Use this procedure when the configuration is so altered that there is no reliable baseline anymore.\n1. Export logs, keystore and any functional patched APK still available.\n2. Write down versions: Manager, target app, Android and GmsCore.\n3. Removes sources from external patches temporarily.\n4. Reset Settings > Advanced and patch options for defaults.\n5. Gets/selects the suggested version and a full APK.\n6. Patches -> Reset/default.\n7. Patch and export APK before installing.\n8. Install. If there is a signing conflict, decide consciously to either recover the old keystore or uninstall\nexisting build.\n9. Opens without customizing. Validate boot, login and playback.\n10. Reintroduce customizations one by one, with a quick test after each small batch.\n\nDONE\nRecovery only ends when you have a reproducible baseline: APK identified base, known selection, keystore\npreserved and past smoking tests.",
      "search": "total recovery runbook\nuse this procedure when the configuration is so altered that there is no reliable baseline anymore.\n1. export logs, keystore and any functional patched apk still available.\n2. write down versions: manager, target app, android and gmscore.\n3. removes sources from external patches temporarily.\n4. reset settings > advanced and patch options for defaults.\n5. gets/selects the suggested version and a full apk.\n6. patches -> reset/default.\n7. patch and export apk before installing.\n8. install. if there is a signing conflict, decide consciously to either recover the old keystore or uninstall\nexisting build.\n9. opens without customizing. validate boot, login and playback.\n10. reintroduce customizations one by one, with a quick test after each small batch.\n\ncome out!\nrecovery only ends when you have a reproducible baseline: apk identified base, known selection, keystore\npreserved and past smoking tests."
    },
    {
      "id": 27,
      "title": "Logs, ADB and Advanced Diagnosis",
      "text": "Logs turn \"doesn't work\" into an observable cause.\n\n27.1 Manager Logs\nSettings > Advanced includes Export debug logs. In patched apps, the ReVanced documentation also describes debug\nlogging and collecting via ADB.[R4][R7]27.2 ADB - Linux/macOS\nadb logcat \nadb logcat \nadb logcat \n\n\n27.3 ADB - Windows PowerShell/CMD\nadb logcat \nadb logcat > logcat-complete. txt\n\n\n27.4 Package and version\nadb shell pm list packages \nadb shell dumpsys package com.google. Android. youtube \n\n\n27.5 Exported APK signature\napksigner verify --print-certs app-patched. apk\n\n\nPRIVACITY\nBefore sharing logs publicly, review and remove tokens, email addresses, IDs or other data other than\nare necessary to reproduce the problem.",
      "search": "logs, adb and advanced diagnosis\nlogs turn \"doesn't work\" into an observable cause.\n\n27.1 manager logs\nsettings > advanced includes export debug logs. in patched apps, the revanced documentation also describes debug\nlogging and collecting via adb.[r4][r7]27.2 adb - linux/macos\nadb logcat \nadb logcat \nadb logcat \n\n\n27.3 adb - windows powershell/cmd\nadb logcat \nadb logcat > logcat-complete. txt\n\n\n27.4 package and version\nadb shell pm list packages \nadb shell dumpsys package com.google. android. youtube \n\n\n27.5 exported apk signature\napksigner verify --print-certs app-patched. apk\n\n\nprivacity\nbefore sharing logs publicly, review and remove tokens, email addresses, ids or other data other than\nare necessary to reproduce the problem."
    },
    {
      "id": 28,
      "title": "Test strategy: how to prove that it has been resolved",
      "text": "A correction without regression test is just a hypothesis.\n\nTest Procedure Passes if...\n\n\nT1 Start force-stop -> open 3x without crash and loaded IU\n\nT2 Login open account/profile recognized account without loop\n\nT3 Playback short same video problem >3 min without pause/buffer abnormal\n\nT4 Alternative video/channel playback is not a video-specific solution\n\nT5 Wi-Fi network and mobile data coherent behavior or difference\nexplained\n\nT6 Background lock screen/PiP if used continues as expected\n\nT7 Reboot reset device configuration persists\n\n\nBASELINE\nRecord the T1-T7 result and the configuration. If a future update fails, you have objective comparison.",
      "search": "test strategy: how to prove that it has been resolved\na correction without regression test is just a hypothesis.\n\ntest procedure passes if...\n\n\nt1 start force-stop -> open 3x without crash and loaded iu\n\nt2 login open account/profile recognized account without loop\n\nt3 playback short same video problem >3 min without pause/buffer abnormal\n\nt4 alternative video/channel playback is not a video-specific solution\n\nt5 wi-fi network and mobile data coherent behavior or difference\nexplained\n\nt6 background lock screen/pip if used continues as expected\n\nt7 reboot reset device configuration persists\n\n\nbaseline\nrecord the t1-t7 result and the configuration. if a future update fails, you have objective comparison."
    },
    {
      "id": 29,
      "title": "Quick decision trees",
      "text": "Use these trees when you want to get to the right chapter in less than a minute.\n\n29.1 Patch does not end\nWRONG BEFORE APPLY PATCHES?\nYES -> sources / selection / dependencies -> chapters 7-9\nNO -> error during patching?\n-> suggested version + full APK + defaults -> chapters 5, 8, 10\n-> OOM? -> Chapter 10\n\n\n29.2 APK does not install\nPATCH ENDED AND APK WAS GRANTED?\nNO -> back to patching\nYES -> Android refuses installation?\n-> signature / application ID / versionCode / profile -> chapter 12\n\n\n29.3 Video does not play\nAPP OPENS AND WORKING LOGIN?\nNO -> Chapters 14-15\nYES -> pause/buffer video?\n-> current patches + Spoof video streams -> chapters 16-18\n-> just background?\n- Just a net? -> Chapter 23",
      "search": "quick decision trees\nuse these trees when you want to get to the right chapter in less than a minute.\n\n29.1 patch does not end\nwrong before apply patches?\nyes -> sources / selection / dependencies -> chapters 7-9\nno -> error during patching?\n-> suggested version + full apk + defaults -> chapters 5, 8, 10\n-> oom? -> chapter 10\n\n\n29.2 apk does not install\npatch ended and apk was granted?\nno -> back to patching\nyes -> android refuses installation?\n-> signature / application id / versioncode / profile -> chapter 12\n\n\n29.3 video does not play\napp opens and working login?\nno -> chapters 14-15\nyes -> pause/buffer video?\n-> current patches + spoof video streams -> chapters 16-18\n-> just background?\n- just a net? -> chapter 23"
    },
    {
      "id": 30,
      "title": "Symptom matrix -> causes -> action",
      "text": "Reference table for quick care.\n\nSymptoms Probable Cause Action\n\n\nPatch with name X does not exist selection/dependence/source Reset/default; official source; logs\n\nPatches fail to load URL/ API format/network validate source and connectivity\n\nOut Of Memory memory/patcher close apps; another experimental process\n\nApp not installed subscription/package/versionCode chapter 12; apksigner\n\nLogin loop GmsCore/patch outdated repatch + GmsCore current\n\nVideo pauses instantly PiP/OS or playback test PiP off; current patches\n\nVideo stops ~0:55-1:00 Spoof client/stream test alternative client controlled\n\nInfinite Buffer Spoof client/patch/rede patch current; other client; A/B network\n\nLow quality/selector absent client/stream responds another client; current patches\n\nOnly with screen off battery/background chapter 24\n\nFeature is gone patch/option missing confirm patch + setting; defaults\n\nProblem after update regression chapter 25; rollback baseline",
      "search": "symptom matrix -> causes -> action\nreference table for quick care.\n\nsymptoms probable cause action\n\n\npatch with name x does not exist selection/dependence/source reset/default; official source; logs\n\npatches fail to load url/ api format/network validate source and connectivity\n\nout of memory memory/patcher close apps; another experimental process\n\napp not installed subscription/package/versioncode chapter 12; apksigner\n\nlogin loop gmscore/patch outdated repatch + gmscore current\n\nvideo pauses instantly pip/os or playback test pip off; current patches\n\nvideo stops ~0:55-1:00 spoof client/stream test alternative client controlled\n\ninfinite buffer spoof client/patch/rede patch current; other client; a/b network\n\nlow quality/selector absent client/stream responds another client; current patches\n\nonly with screen off battery/background chapter 24\n\nfeature is gone patch/option missing confirm patch + setting; defaults\n\nproblem after update regression chapter 25; rollback baseline"
    },
    {
      "id": 31,
      "title": "A-Z resolution index",
      "text": "Look for the word that appears in the error or symptom.\n\nEntry Where to act\n\n\nA - APK bundle Uses full APK for troubleshooting; bundles/splits are different input.\nChapters 5, 10.\n\nA - Different Keystore/certified subscription can prevent update. Chapter 12.\n\nB - Background If it only fails with off screen, battery/restrictions. Chapters 20, 24.\n\nB - Buffering Current Patches + Spoof clients + A/B network. Chapter 16-18, 23.\n\nC - Custom branding If patch does not exist, Reset/default and official source. Cap. 9.\n\nD - DNS Private DNS and filters can interfere. Cap. 23.\n\nD - Downgrade Avoid forcing; verify versionCode/signature. Chapter 12.\n\nG - GmsCore Login/Google services in non-root. Chapter 14.\n\nK - Keystore Preserve for consistent updates. Chapters 3, 12, 25.\n\nL - Logs Export debug logs / ADB. Chapter 27.\n\nM - Manager Official origin, update and safeguards. Chapter 4, 7, 11.\n\nO - OOM Run patcher in another process only when necessary. Chapter 10.\n\nP - Patches Defaults first; sources and dependencies later. Chapter 6-9.\n\nP-PiP Instant pause may be connected to PiP/OS. Chapters 15, 20.\n\nR - Root Do not mix root/non-root runbooks. Chapter 13.\n\nS - Spoof video streams Central in playback; test clients. Chapter 16-18.\n\nV - versionCode Update requires compatible value. Chapter 12.\n\nV - visionOS Client who solved case 0:55 on the tested device; not universal.\nChapter 18.\n\nX - XAPK Split container; do not confuse with full APK. Cap. 5.\n\nY - YouTube Music Treat separately from normal YouTube. Cap. 22.",
      "search": "a-z resolution index\nlook for the word that appears in the error or symptom.\n\nentry where to act\n\n\na - apk bundle uses full apk for troubleshooting; bundles/splits are different input.\ncaps. 5, 10.\n\na - different keystore/certified subscription can prevent update. captain 12.\n\nb - background if it only fails with off screen, battery/restrictions. caps. 20, 24.\n\nb - buffering current patches + spoof clients + a/b network. captain 16-18, 23.\n\nc - custom branding if patch does not exist, reset/default and official source. chapter 9.\n\nd - dns private dns and filters can interfere. chapter 23.\n\nd - downgrade avoid forcing; verify versioncode/signature. captain 12.\n\ng - gmscore login/google services in non-root. chapter 14.\n\nk - keystore preserve for consistent updates. caps. 3, 12, 25.\n\nl - logs export debug logs / adb. chapter 27.\n\nm - manager official origin, update and safeguards. chapter 4, 7, 11.\n\no - oom run patcher in another process only when necessary. captain 10.\n\np - patches defaults first; sources and dependencies later. captain 6-9.\n\np-pip instant pause may be connected to pip/os. caps. 15, 20.\n\nr - root do not mix root/non-root runbooks. chapter 13.\n\ns - spoof video streams central in playback; test clients. captain 16-18.\n\nv - versioncode update requires compatible value. captain 12.\n\nv - visionos client who solved case 0:55 on the tested device; not universal.\ncaptain 18.\n\nx - xapk split container; do not confuse with full apk. chapter 5.\n\ny - youtube music treat separately from normal youtube. chapter 22."
    },
    {
      "id": 32,
      "title": "Checklist to ask for help or open bug report",
      "text": "A reproducible report dramatically reduces time to a useful response.\n☐ Exact description of the symptom and phase where it occurs.\n☐ ReVanced Manager: version and channel (stable/dev).\n☐ Target App + versionName/versionCode.\n☐ Android + manufacturer/model.\n☐ Installation type: non-root/root and root method if applicable.\n☐ Origin of APK and whether it is full APK or bundle/split.\n☐ Patch selection and options changed.\n☐ External patch sources, if any.\n☐ GmsCore version, if relevant.\n☐ Minimal steps to reproduce.\n☐ First relevant exception + full attachment logs.\n☐ Which has already been tested and the results of each test.\n\nQUALITY OF THE REPORT\nIncludes images/videos/logs and version information. The ReVanced documentation explicitly requests this data from the\ncall for help.[R7]",
      "search": "checklist to ask for help or open bug report\na reproducible report dramatically reduces time to a useful response.\n☐ exact description of the symptom and phase where it occurs.\n☐ revanced manager: version and channel (stable/dev).\n☐ target app + versionname/versioncode.\n☐ android + manufacturer/model.\n☐ installation type: non-root/root and root method if applicable.\n☐ origin of apk and whether it is full apk or bundle/split.\n☐ patch selection and options changed.\n☐ external patch sources, if any.\n☐ gmscore version, if relevant.\n☐ minimal steps to reproduce.\n☐ first relevant exception + full attachment logs.\n☐ which has already been tested and the results of each test.\n\nquality of the report\nincludes images/videos/logs and version information. the revanced documentation explicitly requests this data from the\ncall for help.[r7]"
    },
    {
      "id": 33,
      "title": "Maintenance of manual and update policy",
      "text": "ReVanced and YouTube change sides of the client and server. This document must be dealt with.\nas versioned baseline.\n\nTrigger Action in manual\n\nNew Major Manager/Stable Minor Revalidate Menus, Safeguards and Patching Flow\n\nReVanced playback announcement revalidar caps. 16-19 and case 0:55\n\nNew GmsCore/login fix revalidate chapter 14\n\nPatchname change update A-Z and screenshots\n\nNew Android major revalidar install, background, PiP, developer verification\n\nNew real playable case add as VALIDATED CASE without presenting it as rule\nuniversal\n\n\n33.1 Changelog\nVersion Date Changes\n\n1.0 15/08/2026 manual A-Z initial; 31 pages\n\n2.0 16/08/2026 diagnostic architecture, security,\nsignature/keystore, runbooks, ADB, tests,\ndecision trees, case 0:55\ndocumented, revised references",
      "search": "maintenance of manual and update policy\nrevanced and youtube change sides of the client and server. this document must be dealt with.\nas versioned baseline.\n\ntrigger action in manual\n\nnew major manager/stable minor revalidate menus, safeguards and patching flow\n\nrevanced playback announcement revalidar caps. 16-19 and case 0:55\n\nnew gmscore/login fix revalidate chapter 14\n\npatchname change update a-z and screenshots\n\nnew android major revalidar install, background, pip, developer verification\n\nnew real playable case add as validated case without presenting it as rule\nuniversal\n\n\n33.1 changelog\nversion date changes\n\n1.0 15/08/2026 manual a-z initial; 31 pages\n\n2.0 16/08/2026 diagnostic architecture, security,\nsignature/keystore, runbooks, adb, tests,\ndecision trees, case 0:55\ndocumented, revised references"
    },
    {
      "id": 34,
      "title": "Sources and references",
      "text": "Primary/official-first sources used in this edition. Transitional content shall be checked\nagain before critical decisions.\nR1 ReVanced - official download -https://revanced.app/downloadR2 ReVanced Manager - prerequisites -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/0_prerequisites.mdR3 ReVanced Manager - patching apps -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_1_patching.mdR4 ReVanced Manager - settings/advanced/import-export -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_6_settings.mdR5 ReVanced Manager - Troubleshooting -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/3_troubleshooting.mdR6 ReVanced documentation - troubleshooting resources -\nhttps://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.mdR7 ReVanced documentation - FAQ/questions/logs -\nhttps://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/questions.mdR8 ReVanced Manager - managing patches/sources -\nhttps://github.com/ReVanced/revanced-manager/blob/main/docs/2_3_managing_patches.mdR9 ReVanced Manager - updating -https://github.com/ReVanced/revanced-manager/blob/main/docs/2_5_updating.mdR10 ReVanced announcement - YouTube/YouTube Music playback issues fixed (02/06/2026) -\nhttps://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixedR11 ReVanced announcement - GmsCore updated and login fixed (15/02/2026) -https://revanced.app/announcements?id=19-gmscore-updated-and-login-fixed\nR12 ReVanced Manager repository/releases -https://github.com/ReVanced/revanced-managerR13 Android Developers - app update requirements/signing -https://developer.android.com/google/play/app-updatesR14 Android Developers - Android App Bundle/split APK format -https://developer.android.com/guide/app-bundle/app-bundle-format\nR15 ReVanced Manager issue #3384 - dependent/disabled patch example -https://github.com/ReVanced/revanced-manager/issues/3384\nR16 Android Developers - appksigner -https://developer.android.com/tools/apksignerREAL LIMITS\nMenus, patch names, Spoof clients and compatibility can change without changing this PDF. Patches of\nthird parties are not covered as equivalent to officers. Root solutions depend on the method. The visionOS case is a\ncase validated locally, not a promise of universal compatibility.",
      "search": "sources and references\nprimary/official-first fonts used in this edition. transitional content shall be checked\nagain before critical decisions.\nr1 revanced - official download -https://revanced.app/downloadr2 revanced manager - prerequisites -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/0_prerequisites.mdr3 revanced manager - patching apps -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_1_patching.mdr4 revanced manager - settings/advanced/import-export -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_6_settings.mdr5 revanced manager - troubleshooting -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/3_troubleshooting.mdr6 revanced documentation - troubleshooting resources -\nhttps://github.com/revanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.mdr7 revanced documentation - faq/questions/logs -\nhttps://github.com/revanced/revanced-documentation/blob/main/docs/revanced-resources/questions.mdr8 revanced manager - managing patches/sources -\nhttps://github.com/revanced/revanced-manager/blob/main/docs/2_3_managing_patches.mdr9 revanced manager - updating -https://github.com/revanced/revanced-manager/blob/main/docs/2_5_updating.mdr10 revanced announcement - youtube/youtube music playback issues fixed (02/06/2026) -\nhttps://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixedr11 revanced announcement - gmscore updated and login fixed (15/02/2026) -https://revanced.app/announcements?id=19-gmscore-updated-and-login-fixed\nr12 revanced manager repository/releases -https://github.com/revanced/revanced-managerr13 android developers - app update requirements/signing -https://developer.android.com/google/play/app-updatesr14 android developers - android app bundle/split apk format -https://developer.android.com/guide/app-bundle/app-bundle-format\nr15 revanced manager issue #3384 - dependent/disabled patch example -https://github.com/revanced/revanced-manager/issues/3384\nr16 android developers - appksigner -https://developer.android.com/tools/apksignerreal limits\nmenus, patch names, spoof clients and compatibility can change without changing this pdf. patches of\nthird parties are not covered as equivalent to officers. root solutions depend on the method. the visionos case is a\ncase validated locally, not a promise of universal compatibility."
    }
  ],
  "diagnostics": [
    {
      "id": "manager",
      "label": "Manager does not install or does not open",
      "confidence": "OFFICIAL",
      "chapters": [
        3,
        4,
        11
      ],
      "steps": [
        "Confirm that Manager came from revanced.app or the official repository.",
        "Confirm the Android requirement documented for the current version.",
        "Update to the stable channel and restore Settings > Advanced to recommended defaults.",
        "Collect logs before clearing data or reinstalling."
      ],
      "risk": "Low"
    },
    {
      "id": "patches",
      "label": "Patches do not load/patch does not exist",
      "confidence": "OFFICIAL",
      "chapters": [
        7,
        8,
        9
      ],
      "steps": [
        "In the patch selector, use Reset/default.",
        "Temporarily remove external patch sources.",
        "Confirm the app version and compatibility.",
        "If “Patch with name … does not exist” appears, save the complete log and the first relevant exception."
      ],
      "risk": "Low"
    },
    {
      "id": "build",
      "label": "Patching failure / OOM / build does not end",
      "confidence": "OFFICIAL",
      "chapters": [
        5,
        6,
        8,
        10
      ],
      "steps": [
        "Use the suggested version and a full APK when the flow requires an APK from storage.",
        "Repeat with the default patch selection.",
        "Close heavy applications and confirm enough free storage.",
        "Only if the log indicates insufficient memory, test the experimental option to run the patcher in another process."
      ],
      "risk": "Medium"
    },
    {
      "id": "install",
      "label": "APK patched does not install / update incompatible",
      "confidence": "OFFICIAL",
      "chapters": [
        3,
        12,
        25
      ],
      "steps": [
        "Confirm package/application ID, signature and versionCode.",
        "Preserve the keystore from the working installation before clearing Manager data.",
        "Check whether another instance of the app exists in another profile or Second Space.",
        "Use apksigner to compare certificates when the Android SDK is available."
      ],
      "risk": "Medium"
    },
    {
      "id": "login",
      "label": "Login failed / GmsCore",
      "confidence": "OFFICIAL",
      "chapters": [
        14,
        23
      ],
      "steps": [
        "Confirm that the build uses GmsCore support when applicable.",
        "Repatch with current patches if the problem started after authentication changes.",
        "Update GmsCore only when necessary or recommended by the official flow.",
        "To separate network from authentication, temporarily test without VPN or filtering DNS."
      ],
      "risk": "Low"
    },
    {
      "id": "playback",
      "label": "Video pause, buffer, 403 or do not play",
      "confidence": "OFFICIAL",
      "chapters": [
        16,
        17,
        18,
        19,
        23
      ],
      "steps": [
        "Confirm that current patches are installed.",
        "Confirm Spoof video streams when the build uses it.",
        "Test the same video and change only one variable at a time.",
        "If loading is slow or buffering occurs, test another client under ReVanced Settings > Miscellaneous > Spoof video streams > Default Client.",
        "Use Stats for nerds to record client, codec and behavior."
      ],
      "risk": "Low"
    },
    {
      "id": "055",
      "label": "Video stops near 0:55–1:00",
      "confidence": "VALIDATED CASE",
      "chapters": [
        17,
        18
      ],
      "steps": [
        "In the documented case, the client was Android Reel (no auth) and the UI itself warned that the video could stop at 1:00.",
        "Only one change was tested: Default Client → visionOS.",
        "After fully restarting YouTube, the same content passed the failure point.",
        "This is a local result and must not be treated as a universal guarantee."
      ],
      "risk": "Low"
    },
    {
      "id": "background",
      "label": "Background only fails/screen off/PiP",
      "confidence": "OFFICIAL",
      "chapters": [
        20,
        24
      ],
      "steps": [
        "Distinguish normal playback from background playback.",
        "Review manufacturer battery and background execution restrictions.",
        "If the video pauses immediately after pressing Play, test disabling PiP as described in the official troubleshooting guidance.",
        "Retest with the same video and the same conditions."
      ],
      "risk": "Low"
    },
    {
      "id": "update",
      "label": "Problem started after updating",
      "confidence": "WORKAROUND",
      "chapters": [
        25,
        28,
        33
      ],
      "steps": [
        "Record the previous working version and the new version.",
        "Avoid changing APK, patches, GmsCore and Spoof client at the same time.",
        "Create a control build using defaults.",
        "If necessary, roll back only to a known baseline and validate again."
      ],
      "risk": "Medium"
    },
    {
      "id": "report",
      "label": "Need to ask for help / open bug report",
      "confidence": "OFFICIAL",
      "chapters": [
        27,
        28,
        32
      ],
      "steps": [
        "Include Manager version, app/versionCode, Android and root/non-root type.",
        "State the APK origin/format and patch selection.",
        "Attach complete logs and the first relevant exception.",
        "Describe the minimum reproduction steps and every test already performed."
      ],
      "risk": "Low"
    }
  ],
  "sources": [
    {
      "id": "R1",
      "name": "ReVanced - site/download oficial",
      "url": "https://revanced.app/download",
      "kind": "Oficial"
    },
    {
      "id": "R2",
      "name": "ReVanced Manager - prerequisites",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/0_prerequisites.md",
      "kind": "Oficial"
    },
    {
      "id": "R3",
      "name": "ReVanced Manager - patching apps",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_1_patching.md",
      "kind": "Oficial"
    },
    {
      "id": "R4",
      "name": "ReVanced Manager - settings",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_6_settings.md",
      "kind": "Oficial"
    },
    {
      "id": "R5",
      "name": "ReVanced Manager - troubleshooting",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/3_troubleshooting.md",
      "kind": "Oficial"
    },
    {
      "id": "R6",
      "name": "ReVanced documentation - troubleshooting",
      "url": "https://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/troubleshooting.md",
      "kind": "Oficial"
    },
    {
      "id": "R7",
      "name": "ReVanced documentation - questions/logs",
      "url": "https://github.com/ReVanced/revanced-documentation/blob/main/docs/revanced-resources/questions.md",
      "kind": "Oficial"
    },
    {
      "id": "R8",
      "name": "ReVanced Manager - managing patches",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_3_managing_patches.md",
      "kind": "Oficial"
    },
    {
      "id": "R9",
      "name": "ReVanced Manager - updating",
      "url": "https://github.com/ReVanced/revanced-manager/blob/main/docs/2_5_updating.md",
      "kind": "Oficial"
    },
    {
      "id": "R10",
      "name": "ReVanced - playback issues fixed",
      "url": "https://revanced.app/announcements?id=23-youtube-and-youtube-music-playback-issues-fixed",
      "kind": "Oficial"
    },
    {
      "id": "R11",
      "name": "ReVanced - GmsCore/login fix",
      "url": "https://revanced.app/announcements?id=19-gmscore-updated-and-login-fixed",
      "kind": "Oficial"
    },
    {
      "id": "R12",
      "name": "ReVanced Manager - repository/releases",
      "url": "https://github.com/ReVanced/revanced-manager",
      "kind": "Oficial"
    },
    {
      "id": "R13",
      "name": "Android Developers - app updates/signing",
      "url": "https://developer.android.com/google/play/app-updates",
      "kind": "Primária"
    },
    {
      "id": "R14",
      "name": "Android Developers - App Bundle format",
      "url": "https://developer.android.com/guide/app-bundle/app-bundle-format",
      "kind": "Primária"
    },
    {
      "id": "R15",
      "name": "ReVanced Manager issue #3384",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3384",
      "kind": "Issue"
    },
    {
      "id": "R16",
      "name": "Android Developers - apksigner",
      "url": "https://developer.android.com/tools/apksigner",
      "kind": "Primária"
    },
    {
      "id": "R17",
      "name": "ReVanced - counterfeit notice",
      "url": "https://counterfeits.revanced.app/",
      "kind": "Oficial"
    }
  ],
  "currentReports": [
    {
      "issue": 3505,
      "title": "Google Photos 7.87+: patched app can crash at startup",
      "state": "OPEN",
      "reported": "2026-08-22",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Medium",
      "scope": "Google Photos / GmsCore support / arranque",
      "summary": "An official report describes crash immediately after patching from Google Photos 7.87 or higher; the documented test uses 7.89, Manager 2.6.0 and preset patches with GmsCore support/Spoof features. The stack trace ends in ExceptionInInitializerError caused by NullPointerException in SharedPrefCategory during startup of the ReVanced/GmsCoreSupport extension settings. It is a single report, without upstream confirmation or second device, so it does not prove general incompatibility with all versions 7.87+.",
      "action": "If Google Photos patched closes on startup, register exact version of the app, Manager, patches, Android and logcat before changing settings. Compare first with the version suggested/supported by patches and the predefined selection. Do not clear accounts, do not change GmsCore or disable Android protections as a generic attempt. If stack trace matches, attach evidence to issue and wait for upstream confirmation or updated patches.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3505"
    },
    {
      "issue": 377,
      "title": "GmsCore: APK v0.3.13.2.250932 appears invalid on some devices",
      "state": "OPEN",
      "reported": "2026-07-11",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "GmsCore / instalação / APK",
      "summary": "The official issue of the GmsCore brings together reports on Samsung Fold5, Sony Xperia 10 III (Android 13) and Honor X8A (Android 14) invalid or uninstalled APK. The original author reported after v0.3. 13.3.250932 installed correctly on your device, but a later report in Honor X8A states that testing both files continued to fail. The evidence confirms a multiple device installation problem, but not a universal version correction.",
      "action": "Confirm that APK only came from the official release of ReVanced GmsCore and register the exact file name, version, variant, Android and installation error. Do not disable Play Protect, subscription checks or other protections to force the installation. If v0.3.13.2.250932 is rejected, test only a more recent official release suitable to the device and collect the 'adb install' error if it persists; avoid mirrors or repacked APKs.",
      "url": "https://github.com/ReVanced/GmsCore/issues/377"
    },
    {
      "issue": 381,
      "title": "YouTube Music: Failed to Fetch Client Streams and playback blocks close to 1 minute",
      "state": "OPEN",
      "reported": "2026-07-24",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube Music / Spoof video streams / playback",
      "summary": "The official issue of GmsCore brings together several reports of YouTube Music to stop or buffer close to 1 minute and of Fetch Client Streams. Four users confirmed separately that selecting Android VR solved the problem in their cases. A second official Manager issue (#3445), updated on 2026-08-23, reinforces that the result varies per client: Android VR, visionOS or Android Reel solved different cases, while at least one user reported failure with all tested customers. There is no upstream confirmation of the cause or universal correction.",
      "action": "Confirm YouTube Music, patches and GmsCore versions; preserve logs before changing settings. Test one client at a time (Android VR, visionOS or another available on build), fully restart the app and play at least one full track and a second track. If it fails, go back to baseline and test another client. Do not confuse the Spoof client with patching compatibility: changing the client can fix playback, but does not make a YouTube Music version not automatically supported patchable. Do not downgrade GmsCore or use unofficial forks as first answer.",
      "url": "https://github.com/ReVanced/GmsCore/issues/381"
    },
    {
      "issue": 3501,
      "title": "YouTube does not load: multiple streaming clients return 400 and no stream is obtained",
      "state": "OPEN",
      "reported": "2026-08-19",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube / Spoof video streams / playback",
      "summary": "The official issue includes logs with 400 Bad Request replies in ANDROID UNPLUGGED, ANDROID CREATOR, IOS UNPLUGGED and ANDROID VR AUTH, ending in Couldn not match any client streams. Several users reported similar failures. Android VR or visionOS solve some cases, but fail others. An isolated report indicates that deactivating Spoof Video Streams caused the playback to work again even with Android VR already selected. In 2026-08-26, another user reported that switching clients, restarting, repatch and rollback to old versions did not resolve in a lasting way; the repatch helped only about 24 hours before the regression. These behaviors are contradictory and are not confirmed by the upstream; they should not be treated as general correction. There is still no upstream confirmation of the cause or official fix.",
      "action": "Confirm YouTube version, patches and ReVanced Manager; save logs before changing settings. Test only one Spoof video streams client at a time and fully restart the app between tests. Android VR and visionOS can be tested as reported workarounds, but are not confirmed corrections. Disable Spoof Video Streams should only be considered as a temporary diagnostic test to reproduce the isolated report, with immediate reversal if not resolved or degraded playback; do not recommend this option as a permanent configuration without upstream confirmation. If repatch or rollback produces only temporary improvement, record how long it takes and revert to supported baseline instead of repeating downgrade cycles. If all clients return 400, do not clear account or reinstall GmsCore by default; wait upstream confirmation or updated patches.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3501"
    },
    {
      "issue": 387,
      "title": "After reset, adding account to GmsCore failed; reinstalling YouTube patched solved the author's case",
      "state": "CLOSED",
      "reported": "2026-08-18",
      "classification": "REPORTED / REPORTER WORKAROUND",
      "evidence": "Low",
      "scope": "GmsCore / login após factory reset",
      "summary": "After a factory reset, one user reported that GmsCore returned a generic message when adding the account. The issue was closed after the author himself indicated that reinstalling YouTube ReVanced solved your case. There are no logs, upstream confirmation or enough evidence to treat this as universal correction.",
      "action": "If the symptom coincides, confirm first versions and correct installation of GmsCore/YouTube. A controlled reinstallation of YouTube patched can be tested without changing device identity or other options. If it works, treat only as local workaround and register versions/logs.",
      "url": "https://github.com/ReVanced/GmsCore/issues/387"
    },
    {
      "issue": 3500,
      "title": "YouTube Shorts: some previews appear on full screen",
      "state": "OPEN",
      "reported": "2026-08-16",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Low",
      "scope": "YouTube Shorts",
      "summary": "It has been reported that some Shorts previews appear as a whole screen. The report does not include patch log or debug log.",
      "action": "Do not change configuration based only on this account. Collect YouTube version, patches and logs if the symptom is reproduced.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3500"
    },
    {
      "issue": 3499,
      "title": "Video takes ~30 s to start, low quality and selector unavailable",
      "state": "CLOSED",
      "reported": "2026-08-15",
      "classification": "REPORTED + COMMUNITY WORKAROUND",
      "evidence": "Medium",
      "scope": "YouTube / Spoof video streams",
      "summary": "The author reported delay before the playback, low quality and quality option unavailable. There are debug logs attached. The author confirmed that a spoof client change solved his case, but another user reported that the same approach did not work. The issue was closed as completed in 2026-08-18; it remains undocumented official fix.",
      "action": "If the pattern matches, test a single alternative client on Spoof video streams, fully restart the app and repeat the same video. Record result. Do not promote visionOS as a universal solution.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3499"
    },
    {
      "issue": 3498,
      "title": "Forward/seek in video can block playback",
      "state": "CLOSED",
      "reported": "2026-08-15",
      "classification": "WORKAROUND CONFIRMED BY REPORTER",
      "evidence": "Medium",
      "scope": "YouTube / seeking / spoof client",
      "summary": "By advancing a playback, the video could block and not resume. The author confirmed that visionOS and Android VR worked on your device, while Android Reel / Android Reel (no auth) did not work. The issue was closed as completed in 2026-08-16.",
      "action": "Use the same controlled methodology: change only the Default Client, fully restart YouTube and retest the same content. Treat as a workaround by device, not as an official fix.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3498"
    },
    {
      "issue": 3496,
      "title": "Screen darkens when entering fullscreen",
      "state": "CLOSED",
      "reported": "2026-08-14",
      "classification": "REPORTED / NO DOCUMENTED FIX",
      "evidence": "Medium",
      "scope": "YouTube / fullscreen",
      "summary": "It has been reported that the screen darkens on fullscreen, with logcat attached. The issue was terminated as completed on the same day, without comments or documented correction procedure.",
      "action": "Do not invent solution. If played, save logs, compare with official YouTube and test a preset patch baseline.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3496"
    },
    {
      "issue": 3494,
      "title": "Livestream pauses about 1 minute after entering",
      "state": "OPEN",
      "reported": "2026-08-10",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Medium",
      "scope": "YouTube Live / playback",
      "summary": "In live broadcasts, the video is reported as paused about a minute after entering; closing and reopening the live only solves temporarily. Issue #3494 includes debug log and various answers. A second independent issue, #3514 (01/09), describes livestream to freeze after about 1 minute and present error; this report uses YouTube Morphe/external branding and does not include patch logs, so it only reinforces the symptom and does not establish cause in official ReVanced.",
      "action": "Distinguish this bug case in normal videos. Collect Stats for nerds, YouTube/Manager/patches version, spoof client and logs; change only one variable per test. If the installation uses Morphe, external branding or other third party components, repeat first on an official ReVanced basis comparable before assigning causality. Preserve logs and avoid treating closing/reopening live as a definitive fix.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3494"
    },
    {
      "issue": 384,
      "title": "GmsCore: Persistent process can end with AuthenticatorException timeout",
      "state": "OPEN",
      "reported": "2026-08-09",
      "classification": "REPORTED / TECHNICAL EVIDENCE",
      "evidence": "Medium",
      "scope": "GmsCore / Android 16 / autenticação",
      "summary": "A report in the official repository of GmsCore includes stack trace of a process crash :persistent caused by android.accounts. AuthenticatorException: timeout during communication with AccountManager. The device was under high load; there is no confirmation of general cause or documented upstream correction.",
      "action": "If login or sync fails, save logcat and search AuthenticatorException: timeout. Repeat testing with the device at normal load and register GmsCore/Android version before clearing accounts or reinstalling components.",
      "url": "https://github.com/ReVanced/GmsCore/issues/384"
    },
    {
      "issue": 3490,
      "title": "UI may remain unanswered during SponsorBlock Skip notification",
      "state": "OPEN",
      "reported": "2026-08-08",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Medium",
      "scope": "YouTube / SponsorBlock / UI",
      "summary": "The report describes temporary blocking of gestures/touches, up to about 4 seconds, when the Skip notification of the SponsorBlock appears. Includes logcat and video.",
      "action": "If played, register device, version, patches and lock duration. Do not disable unrelated components without A/B test.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3490"
    },
    {
      "issue": 3488,
      "title": "Playback can stop/back and quality can degrade after ~1 min",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube / playback / background / Spoof video streams",
      "summary": "The author reported pauses and indentations when leaving the app or turning off the screen. Other users reported random pauses/backs and, in some cases, quality decrease with the selector blocked after about 1 minute. Switching Spoof video streams client to viewOS or Android VR temporarily solved some cases, but there are reports of regression after days/long videos and, in a separate issue (#3310), visionOS does not resolve. There is no upstream confirmation of a universal correction.",
      "action": "Take controlled A/B test: note down the current client, test an available alternative client, close/reopen YouTube and play the same video for at least 3 minutes. Compare background/background, quality and indentations. If improved, retest after long videos; if worsen or return, revert to baseline and test another client. Do not treat visionOS/Android VR as permanent correction.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3488"
    },
    {
      "issue": 3486,
      "title": "Shorts: Black screens and ads despite patches",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "REPORTED / LIMITED EVIDENCE",
      "evidence": "Low",
      "scope": "YouTube Shorts / ads",
      "summary": "It has been reported that when wiping between Shorts, black screens or ads appear without normal controls. The report includes images but not useful diagnostic logs.",
      "action": "Treat as an open account. Confirm version, patches and if the behavior also exists with predefined selection before suggesting changes.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3486"
    },
    {
      "issue": 3484,
      "title": "Instagram: patch Disable analytics may fail with Required value was null",
      "state": "OPEN",
      "reported": "2026-08",
      "classification": "REPORTED / TECHNICAL EVIDENCE",
      "evidence": "High",
      "scope": "Instagram / patching",
      "summary": "The published log shows PatchException in the Disable analytics patch, caused by Required value was null during bytecode matching. This indicates concrete incompatibility between the app version and the patch, not a simple generic Manager error.",
      "action": "Use compatible/sugered version and current patches. Do not insist on multiple random versions. Store stack trace and check if the incompatibility has been corrected upstream before repatching.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3484"
    },
    {
      "issue": 3381,
      "title": "YouTube may take 1–2 min to start and get stuck in low quality",
      "state": "OPEN",
      "reported": "2026-05-28",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube / playback / qualidade / Spoof video streams",
      "summary": "The official issue brings together multiple video confirmations that take about 1–2 minutes to start and, in some cases, are stuck in low quality or without quality selector. Additional reports in issue #3508 describe playback initially in HD, followed after about 1 minute per buffering/black screen and regression to 240p/480p, sometimes with the quality selector unavailable. Several users report improvement by changing the Default client from Spoof video streams to visionOS; Android VR also works in some cases. However, there are reports in which these clients fail to resolve or do not resolve at all. A recent corroboration in #3508, with patches 6.2.1 and Manager 2.6.0, reports stuck quality close to 360p in part of the videos and no improvement when testing Android Reel, Android Studio, visionOS and other clients. Another user reported improvement by simultaneously changing to visionOS and activating Force CVA; as two variables were changed at the same time, the result did not confirm which one had an effect or constituted a validated correction. There is no universal correction confirmed.",
      "action": "Confirm YouTube version and patches, activate debug logs and test the same video with one variable at a time. If available, test visionOS or Android VR just as workaround reported, fully restarting the app between tests. Compare time to start, quality and selector. A recent report in issue #3467 indicates that visionOS can prevent playback of 360/VR videos; if this content is relevant, include a 360/VR video in the A/B test and reverse the client if there is regression. If the problem persists in multiple customers, go back to baseline, preserve logs and not assign the network or GMSCore failure without evidence. An isolated report in #3508 associates quality lock to black screen and device reboot, without identified cause; if it occurs, stop repetitive tests, preserve logcat and system/seller logs when available and return to baseline, without assuming causality with ReVanced.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3381"
    },
    {
      "issue": 3507,
      "title": "Reddit: patch Hide 'Trending Today' shelf may fail with Required value was null",
      "state": "OPEN",
      "reported": "2026-08-23",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Medium",
      "scope": "Reddit / patching / Hide Trending Today shelf",
      "summary": "A technical report shows failure to apply Hide 'Trending Today' shelf to Reddit 2026.33.1 with Manager 2.7.0-dev.11: PatchException caused by Required value was null during matching bytecode in firstImmutableMethod. The error points to patch incompatibility with the structure of this version of Reddit; there is no further report or confirmation.",
      "action": "Preserve stack trace, confirm the suggested/supported version of Reddit and current patches, and repeat with preset selection in a stable version of Manager before completing. If the UI allows, uncheck only Hide 'Trending Today' shelf can be used as temporary A/B test to isolate the patch; do not assign error to RAM, GmsCore or permissions without evidence.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3507"
    },
    {
      "issue": 3510,
      "title": "Restore old version playback speed menu may not restore old interface",
      "state": "OPEN",
      "reported": "2026-08-27",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Low",
      "scope": "YouTube / playback speed / interface / patch option",
      "summary": "A single user reports that even with Restore old version playback speed menu enabled, it continues to see the new interface and cannot select speeds above 2x. The issue is open, no comments, no patch logs and no useful debug logs; there is no upstream confirmation or independent playback.",
      "action": "Confirm versions of YouTube, ReVanced Manager and patches; confirm that the option was included in the build and fully restart the app. Compare with a build baseline using preset selection and change only one variable at a time. Do not recommend downgrade, account cleaning/GmsCore or other destructive changes without further evidence.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3510"
    },
    {
      "issue": 3513,
      "title": "YouTube: field to write comment can disappear with Hide Emoji and Timestamp buttons",
      "state": "OPEN",
      "reported": "2026-09-01",
      "classification": "REPORTED / NOT CONFIRMED",
      "evidence": "Low",
      "scope": "YouTube / comentários / Hide Emoji and Timestamp buttons",
      "summary": "A single official report indicates that with Hide Emoji and Timestamp buttons active, the area for writing comments may be reduced to a grey line and no longer usable. The issue was opened in 2026-09-01, does not contain patch logs or debug logs and does not yet have independent confirmations; the association with patch is therefore only reported and not a confirmed upstream cause.",
      "action": "If the symptom matches, register YouTube, Manager and patches versions and confirm that Hide Emoji and Timestamp buttons are included in the build. Do a controlled A/B test: repatch only with this option disabled, keeping APK, remaining patches and account equal, and compare the comment box. If the difference is playable, save logs and attach the result to issue. Do not clear account/GmsCore or downgrade as first attempt.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3513"
    },
    {
      "issue": 3511,
      "title": "YouTube Music can stop after ~1 min and stay in buffering",
      "state": "OPEN",
      "reported": "2026-08-29",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube Music / playback / Spoof video streams",
      "summary": "Official issue #3511 reports that playback on YouTube Music can start normally and, after about 1 minute, go wrong/buffering and stop continuing; at least two additional users confirmed similar behavior. The author's debug log shows Spoof video streams to use ANDROID REEL NO AUTH. One user reported temporary improvement when switching the Default client to visionOS, but there is no upstream confirmation of cause or universal correction.",
      "action": "Register YouTube Music, Manager and patches versions and test the same content for at least 3 minutes. Test A/B changing only the Default client of Spoof video streams, fully restarting the app between tests. visionOS can be experienced only as workaround reported; if there is no improvement or regression, return to baseline. Preserve debug logs and do not assign the problem to the network, account or GMSCore without further evidence.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3511"
    },
    {
      "issue": 1504,
      "title": "YouTube Music may enter ANR during playback with a very large AbstractFuture chain",
      "state": "OPEN",
      "reported": "2026-08-17",
      "classification": "REPORTED / TECHNICAL EVIDENCE",
      "evidence": "Medium",
      "scope": "YouTube Music / ANR / playback / async",
      "summary": "An official ReVanced organization discussion documents an ANR in YouTube Music 8.40.54 patched with patches 6.2.1 and Manager 2.6.0. The main thread remains Runnable while recursively traversing a chain of roughly 11,000–12,700 Guava AbstractFuture objects, building a very large string until the input deadline is exceeded and the app is terminated. The reporter reproduced the behavior with GmsCore 0.3.13.3 and 0.3.13.2 and states that the unpatched version of the same app on the same device does not show the ANR. The report also states that stream spoofing remains functional. There is no independent reproduction or upstream confirmation of the root cause yet.",
      "action": "If the symptom is a freeze/ANR rather than simple buffering, preserve the ANR trace and logcat before clearing data. Record YouTube Music, Manager, patches, GmsCore, Android and device versions, and compare with the unpatched app on the same version when safe. Do not assume that changing the Spoof video streams client or GmsCore resolves this case: the report points to an asynchronous runtime chain, not stream acquisition failure. Treat any workaround as experimental until there is independent reproduction or an upstream fix.",
      "url": "https://github.com/orgs/ReVanced/discussions/1504"
    },
    {
      "issue": 3379,
      "title": "YouTube/YouTube Music: notifications may not arrive despite Cloud Messaging being enabled",
      "state": "OPEN",
      "reported": "2026-05-25",
      "classification": "REPORTED / MULTIPLE REPORTS",
      "evidence": "Medium",
      "scope": "YouTube / YouTube Music / GmsCore / notifications",
      "summary": "Official ReVanced Manager issue #3379 reports missing YouTube notifications after repatching despite updated GmsCore/microG, Cloud Messaging being enabled and the account being signed in. Four additional users reported similar behavior, with new activity on 2026-09-03. Official GmsCore issue #379 documented the same symptom for YouTube and YouTube Music across four phones and received additional confirmations. In that discussion, one user presented technical analysis involving an HTTP 400 response during Google Notification Platform registration and a C2DM permission mismatch, but neither that causal explanation nor the proposed fix has been confirmed upstream; the closure of #379 also does not document a universal fix.",
      "action": "First confirm the app notification permissions, Cloud Messaging registration/status in GmsCore, YouTube/YouTube Music versions, patches, GmsCore version, and battery/background restrictions. Collect logcat/debug logs before clearing data. Update only through official channels and retest without changing multiple variables at once. Do not edit manifests, apply experimental external patches, clear accounts, or disable Android protections as a generic attempt; the technical hypothesis described in GmsCore #379 remains unconfirmed upstream.",
      "url": "https://github.com/ReVanced/revanced-manager/issues/3379"
    }
  ]
};
