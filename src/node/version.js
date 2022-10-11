import fs from 'fs';
import path from 'path';
import semver from 'semver'

const generateNodeVersion = (root = process.cwd()) => {
  const versions = traversalDirField(root, "engines")
  console.log("finally  versions is : ", versions)
  console.log(semver.Range)
  const range = versions.filter(item => !!item && !!item.node).map(item => semver.minVersion(item.node))
  const node = range.sort((a, b) => {
    return a.major - b.major || a.minor - b.minor || a.patch - b.patch
  }).pop()
  console.log(node.version)
  writePkgField("node", ">=" + node.version, "engines")
  writePkgField("semver", "latest", "devDependencies")
  writePkgField("postinstall", "node ./checkEnv.js", "scripts")
}

const traversalDirField = (root, field, versions = []) => {
  const nodeModulesDir = path.join(root, "node_modules");
  let files = []
  try {
    if (fs.existsSync(nodeModulesDir)) {
      files = fs.readdirSync(nodeModulesDir)
    }

  } catch (err) {
    console.log("read dir, ", err, nodeModulesDir)
  }
  files.forEach(file => {
    const filePath = path.resolve(nodeModulesDir, file)
    console.log("filePath", filePath)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      const pkgPath = path.resolve(filePath, "package.json")
      if (fs.existsSync(pkgPath)) {
        console.log("存在package.json", file)
        const data = fs.readFileSync(pkgPath, { encoding: "utf-8" })
        let result
        try {
          result = JSON.parse(data)
        } catch (err) {
          console.log("json parse error: ", err)
          return
        }
        versions.push(result[field])
        console.log(result[field])
      }
      return traversalDirField(filePath, field, versions)
    }
  })
  return versions
}

const writePkgField = (key, content, field) => {
  const pkgPath = path.resolve(process.cwd(), "package.json")
  if (fs.existsSync(pkgPath)) {
    let result
    try {
      const data = fs.readFileSync(pkgPath, { encoding: "utf-8" })
      result = JSON.parse(data)
    }
    catch (err) {
      console.log(err)
    }
    if (result) {
      if (!result.engines) {
        result[field] = {
          [key]: content
        }
      } else {
        result[field] = {
          ...result[field],
          [key]: content
        }
      }
      fs.writeFileSync(pkgPath, JSON.stringify(result, null, 2));
    }
  }
}

export { generateNodeVersion }

